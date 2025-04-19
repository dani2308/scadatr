import random
import requests
from datetime import datetime
import time

# --- Configurações ---
API_URL = "http://localhost:8000/predict"
LOGIN_URL = "http://localhost:8000/login"
EMAIL = "admin@scadatr.com"         # Substitui pelo teu email de login real
PASSWORD = "1234"                  # Substitui pela tua palavra-passe real
INTERVALO_SEGUNDOS = 3              # Frequência com que os logs são enviados

# --- Autenticação ---
def obter_token_jwt(email, password):
    try:
        response = requests.post(
            LOGIN_URL,
            data={"username": email, "password": password},
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        response.raise_for_status()
        token = response.json().get("access_token")
        print("🔐 Token JWT obtido com sucesso.")
        return token
    except Exception as e:
        print("❌ Erro ao obter token JWT:", e)
        return None

# --- Geração de dados simulados ---
def gerar_log_simulado():
    return {
        "timestamp": datetime.utcnow().isoformat(),
        "source_ip": f"192.168.{random.randint(0, 255)}.{random.randint(0, 255)}",
        "destination_ip": f"10.0.{random.randint(0, 255)}.{random.randint(0, 255)}",
        "protocol": random.choice(["TCP", "UDP", "ICMP"]),
        "packet_size": random.randint(20, 1500),
        "prediction": "Desconhecido"  # É sobrescrito no backend
    }

# --- Envio para a API ---
def enviar_log(log, token):
    headers = {
        "Authorization": f"Bearer {token}"
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

    token = obter_token_jwt(EMAIL, PASSWORD)
    if not token:
        print("⛔ Não foi possível iniciar a simulação — token inválido.")
        exit(1)

    while True:
        log = gerar_log_simulado()
        enviar_log(log, token)
        time.sleep(INTERVALO_SEGUNDOS)
