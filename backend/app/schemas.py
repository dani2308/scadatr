from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

class Token(BaseModel):
    access_token: str
    token_type: str

# --- Users ---
class UserBase(BaseModel):
    username: str
    role: Optional[str] = "user"


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int

    class Config:
        form_attributes = True


# --- Logs ---
class LogBase(BaseModel):
    timestamp: Optional[datetime] = None
    source_ip: str
    destination_ip: str
    protocol: str
    length: int
    label: str


class LogCreate(LogBase):
    user_id: int


class LogResponse(LogBase):
    id: int
    user_id: int

    class Config:
        form_attributes = True


# --- Alerts ---
class AlertBase(BaseModel):
    timestamp: Optional[datetime] = None
    description: str
    severity: str


class AlertCreate(AlertBase):
    user_id: int


class AlertResponse(AlertBase):
    id: int
    user_id: int

    class Config:
        form_attributes = True
