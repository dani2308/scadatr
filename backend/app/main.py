from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from app import schemas, models
from app.database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/logs", response_model=list[schemas.LogResponse])
def get_logs(db: Session = Depends(get_db)):
    return db.query(models.Log).all()

@app.post("/logs", response_model=schemas.LogResponse)
def create_log(log: schemas.LogCreate, db: Session = Depends(get_db)):
    db_log = models.Log(
        timestamp = log.timestamp,
        source_ip = log.source_ip,
        destination_ip = log.destination_ip,
        protocol = log.protocol,
        length = log.length,
        label = log.label,
        user_id = log.user_id
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log   

@app.get("/alerts", response_model=list[schemas.AlertResponse])
def get_alerts(db: Session = Depends(get_db)):
    return db.query(models.Alert).all()

@app.post("/alerts", response_model=schemas.AlertResponse)
def create_alert(alert: schemas.AlertCreate, db: Session = Depends(get_db)):
    db_alert = models.Alert(
        timestamp = alert.timestamp,
        description = alert.description,
        severity = alert.severity,
        user_id = alert.user_id
    )
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

@app.get("/users", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()
    
@app.post("/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(
        username = user.username,
        password = user.password,
        role = user.role,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
