from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password = Column(String(100), nullable=False)
    role = Column(String(20), default="user")

    logs = relationship("Log", back_populates="user")
    alerts = relationship("Alert", back_populates="user")


class Log(Base):
    __tablename__ = "logs"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    source_ip = Column(String(50))
    destination_ip = Column(String(50))
    protocol = Column(String(20))
    length = Column(Integer)
    label = Column(String(20)) 
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="logs")


class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    description = Column(Text)
    severity = Column(String(20))
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="alerts")
