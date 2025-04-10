from app.database import Base, engine
from app import models

print("A criar tabelas...")
Base.metadata.create_all(bind=engine)
print("Tabelas criadas com sucesso.")
