# Biblioitecas para Config de JWT e Hashing
from datetime import datetime, timedelta
from jose import JWTError, jwt # Biblioteca para criar e verificar JWT Tokens
from passlib.context import CryptContext # Biblioteca para hashing de passwords

# Bibliotecas para Segurança com FastAPI
from sqlalchemy.orm import Session 
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer # Middleware de segurança que extrai o token JWT

from . import models, database

# Chave para codificação JWT
SECRET_KEY = "segredo_deve_ser_mudado_no_futuro"
ALGORITHM = "HS256" # Algoritmo de Encriptação JWT
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Definição do algorimto de hashing (bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Fluxo do OAuth2 para autenticação com bearer token (/login gera token)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login") 

# Verifica a password introduzida com o hash da password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Faz o hash da password
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# Autentica o utilizador através do email e password (via Session)
def authenticate_user(db: Session, email: str, password: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        return False
    return user

# Cria um token JWT e encripta-o
def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Obtém o utilizador atual a partir do token JWT
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(database.get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user
