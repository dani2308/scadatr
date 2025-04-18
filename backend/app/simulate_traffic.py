import random
import requests
from datetime import datetime
import time

# --- Configurações ---
API_URL = "http://localhost:8000/predict"
ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBzY2FkYXRyLmNvbSIsImV4cCI6MTc0NTAyNjM3OX0.2mvW9LRAufYFdzwfnWqXW8YDsD0KoY4t5vI204blpPE"  # Substitui isto por um token válido
INTERVALO_SEGUNDOS = 3  # Frequência com que os logs são enviados

# --- Geração de dados simulados ---
def gerar_log_simulado():
    return {
        "timestamp": datetime.utcnow().isoformat(),
        "source_ip": f"192.168.{random.randint(0, 255)}.{random.randint(0, 255)}",
        "destination_ip": f"10.0.{random.randint(0, 255)}.{random.randint(0, 255)}",
        "protocol": random.choice(["TCP", "UDP", "ICMP"]),
        "packet_size": random.randint(20, 1500),
        "prediction": "Desconhecido"  # Este campo é substituído no backend pela predição real
    }

# --- Envio para a API ---
def enviar_log(log):
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}"
    }
    try:
        response = requests.post(API_URL, json=log, headers=headers)
        if response.status_code == 200:
            print("✅ Log enviado com sucesso:", response.json())
        else:
            print("⚠️ Erro ao enviar log:", response.status_code, response.text)
    except Exception as e:
        print("❌ Erro de conexão com a API:", e)

# --- Loop principal ---
if __name__ == "__main__":
    print("🚀 Início da simulação de tráfego...")
    while True:
        log = gerar_log_simulado()
        enviar_log(log)
        time.sleep(INTERVALO_SEGUNDOS)
