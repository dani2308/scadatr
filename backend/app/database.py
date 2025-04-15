from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi import Depends
from dotenv import load_dotenv
import os

# Carregar variáveis de ambiente do .env
load_dotenv()

# URL da base de dados a partir do ficheiro .env
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("A variável de ambiente DATABASE_URL não está definida (.evn).")

# Criar engine e sessão com SQLAlchemy
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os modelos
Base = declarative_base()

# Dependência do FastAPI para obter sessão da BD
def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
