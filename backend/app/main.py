from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

from app import schemas, models, auth
from app.database import engine, get_db
from app.ml_model import predict_traffic, predict_with_models
from app import crud

# Inicializar FastAPI
app = FastAPI()

# Criar as tabelas no arranque
models.Base.metadata.create_all(bind=engine)

# CORS para permitir comunicação com o frontend
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------- VERIFICAÇÃO ----------------------
@app.get("/")
def root():
    return {"message": "Backend ativo! Vai a /docs para ver a API."}

# ---------------------- LOGIN ----------------------
@app.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# ---------------------- USERS ----------------------
@app.get("/users", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.User).all()

@app.post("/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        password_hash=hashed_password,
        name=user.name,
        created_at=datetime.utcnow()
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# ---------------------- LOGS ----------------------
@app.get("/logs", response_model=list[schemas.LogResponse])
def get_logs(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Log).all()

@app.post("/logs", response_model=schemas.LogResponse)
def create_log(log: schemas.LogCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_log = models.Log(
        timestamp=log.timestamp or datetime.utcnow(),
        source_ip=log.source_ip,
        destination_ip=log.destination_ip,
        protocol=log.protocol,
        packet_size=log.packet_size,  
        prediction=log.prediction,    
        user_id=current_user.id
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)

    # Aplicar modelos ML
    is_anomalous = predict_with_models(log)

    if is_anomalous:
        alert = models.Alert(
            timestamp=datetime.utcnow(),
            description="Anomalia detetada nos logs.",
            severity="Alta",
            user_id=current_user.id
        )
        db.add(alert)
        db.commit()

    return db_log

# ---------------------- ALERTAS ----------------------
@app.get("/alerts", response_model=list[schemas.AlertResponse])
def get_alerts(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Alert).all()

@app.post("/alerts", response_model=schemas.AlertResponse)
def create_alert(alert: schemas.AlertCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_alert = models.Alert(
        timestamp=alert.timestamp or datetime.utcnow(),
        description=alert.description,
        severity=alert.severity,
        user_id=current_user.id
    )
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

# ---------------------- PREDIÇÃO ML ----------------------
@app.post("/predict", response_model=schemas.PredictionResponse)
def predict_and_alert(log: schemas.LogCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_log = models.Log(
        timestamp=log.timestamp or datetime.utcnow(),
        source_ip=log.source_ip,
        destination_ip=log.destination_ip,
        protocol=log.protocol,
        length=log.length,
        label=log.label,
        user_id=current_user.id
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)

    features = {
        "source_ip": log.source_ip,
        "destination_ip": log.destination_ip,
        "protocol": log.protocol,
        "length": log.length,
    }

    prediction = predict_traffic(features)

    if prediction == "Attack":
        alert = models.Alert(
            timestamp=datetime.utcnow(),
            description=f"Ataque detetado de {log.source_ip} para {log.destination_ip}",
            severity="High",
            user_id=current_user.id
        )
        db.add(alert)
        db.commit()

    return {
        "prediction": prediction,
        "log_id": db_log.id
    }
