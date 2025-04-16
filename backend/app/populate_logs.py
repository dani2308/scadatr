from app.database import SessionLocal
from app.models import Log
from datetime import datetime
import random

# Criar uma sessão
db = SessionLocal()

# Gerar logs fictícios
for _ in range(20):
    log = Log(
        timestamp=datetime.utcnow(),
        source_ip="192.168.1.10",
        destination_ip="192.168.1.1",
        protocol="TCP",
        packet_size=1500,  
        prediction="normal",
        user_id=1,
    )
    db.add(log)

db.commit()
db.close()
print("✅ Base de dados populada com logs fictícios.")
