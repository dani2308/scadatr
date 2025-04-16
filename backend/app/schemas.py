from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Removido: OAuth2PasswordBearer (não deve estar aqui)

# --- Token ---
class Token(BaseModel):
    access_token: str
    token_type: str

# --- Users ---
class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True 

# --- Logs ---
class LogBase(BaseModel):
    timestamp: Optional[datetime] = None
    source_ip: str
    destination_ip: str
    protocol: str
    length: int
    label: str

class LogCreate(LogBase):
    pass

class LogResponse(LogBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True  # Corrigido: era 'form_attributes'

# --- Alerts ---
class AlertBase(BaseModel):
    timestamp: Optional[datetime] = None
    description: str
    severity: str

class AlertCreate(AlertBase):
    pass

class AlertResponse(AlertBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True  # Corrigido: era 'form_attributes'

class PredictionResponse(BaseModel):
    prediction: str
    log_id: int
