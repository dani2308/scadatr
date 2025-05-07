from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from typing import Optional


from app import schemas, models, auth
from app.database import engine, get_db
from app.ml_model import predict_traffic
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

@app.get("/me", response_model=schemas.UserResponse)
def read_current_user(
    current_user: models.User = Depends(auth.get_current_user)
):
    return current_user

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

    return db_log

# ---------------------- ALERTAS ----------------------
@app.get("/alerts", response_model=list[schemas.AlertResponse])
def get_alerts(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    severity: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 100
):
    query = db.query(models.Alert)

    # Filtrar pelo utilizador
    query = query.filter(models.Alert.user_id == current_user.id)

    # Filtros opcionais
    if start_date:
        query = query.filter(models.Alert.timestamp >= start_date)
    if end_date:
        query = query.filter(models.Alert.timestamp <= end_date)
    if severity:
        query = query.filter(models.Alert.severity == severity)

    alerts = query.order_by(models.Alert.timestamp.desc()).offset(skip).limit(limit).all()
    return alerts

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

@app.get("/alerts/stats")
def get_alerts_stats(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    results = (
        db.query(
            func.date(models.Alert.timestamp).label("date"),
            func.count().label("count")
        )
        .filter(models.Alert.user_id == current_user.id)  # Importantíssimo! Só os alertas do user
        .group_by(func.date(models.Alert.timestamp))
        .order_by(func.date(models.Alert.timestamp))
        .all()
    )
    return [{"date": str(r.date), "count": r.count} for r in results]


# ---------------------- PREDIÇÃO ML ----------------------
@app.post("/predict", response_model=schemas.PredictionResponse)
def predict_and_alert(log_data: schemas.PredictionInput, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    features_dict = log_data.dict()

    # Faz a predição
    prediction = predict_traffic(features_dict)

    db_log = models.Log(
        timestamp=datetime.utcnow(),
        source_ip=log_data.source_ip,
        destination_ip=log_data.destination_ip,
        protocol=log_data.protocol,
        packet_size=int(features_dict.get("Total_Length_of_Fwd_Packets", 0)),
        prediction=prediction,
        user_id=current_user.id
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)

    # Criar alerta se for ataque
    if prediction == "Attack":
        alert = models.Alert(
            timestamp=datetime.utcnow(),
            description=f"Ataque detetado nos dados de tráfego.",
            severity="High",
            user_id=current_user.id
        )
        db.add(alert)
        db.commit()

    return {"prediction": prediction, "log_id": db_log.id}

