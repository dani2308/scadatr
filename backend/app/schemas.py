from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# --- Token ---
class Token(BaseModel):
    access_token: str
    token_type: str

# --- User ---
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

# --- Log ---
class LogCreate(BaseModel):
    timestamp: Optional[datetime] = None
    source_ip: str
    destination_ip: str
    protocol: str
    packet_size: int
    prediction: str

class LogResponse(LogCreate):
    id: int
    user_id: int

    class Config:
        orm_mode = True

# --- Alert ---
class AlertCreate(BaseModel):
    timestamp: Optional[datetime] = None
    description: str
    severity: str

class AlertResponse(AlertCreate):
    id: int
    user_id: int

    class Config:
        orm_mode = True
        
class PredictionResponse(BaseModel):
    prediction: str
    log_id: int
