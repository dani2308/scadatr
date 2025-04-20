import random
import requests
from datetime import datetime
import time

# --- Configurações ---
API_URL = "http://localhost:8000/predict"
LOGIN_URL = "http://localhost:8000/login"
EMAIL = "admin@scadatr.com"
PASSWORD = "1234"
INTERVALO_SEGUNDOS = 3

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
        "Destination_Port": random.randint(0, 65535),
        "Flow_Duration": random.randint(1, 1000000),
        "Total_Fwd_Packets": random.randint(1, 1000),
        "Total_Length_of_Fwd_Packets": random.uniform(0, 10000),
        "Fwd_Packet_Length_Max": random.uniform(0, 1500),
        "Fwd_Packet_Length_Min": random.uniform(0, 1500),
        "Fwd_Packet_Length_Mean": random.uniform(0, 1500),
        "Fwd_Packet_Length_Std": random.uniform(0, 500),
        "Bwd_Packet_Length_Max": random.uniform(0, 1500),
        "Bwd_Packet_Length_Min": random.uniform(0, 1500),
        "Bwd_Packet_Length_Mean": random.uniform(0, 1500),
        "Bwd_Packet_Length_Std": random.uniform(0, 500),
        "Flow_Bytes_s": random.uniform(0, 1000000),         # Corrigido
        "Flow_Packets_s": random.uniform(0, 1000),          # Corrigido
        "Flow_IAT_Mean": random.uniform(0, 100000),
        "Flow_IAT_Std": random.uniform(0, 100000),
        "Flow_IAT_Max": random.uniform(0, 100000),
        "Flow_IAT_Min": random.uniform(0, 100000),
        "Fwd_IAT_Total": random.uniform(0, 100000),
        "Fwd_IAT_Mean": random.uniform(0, 100000),
        "Fwd_IAT_Std": random.uniform(0, 100000),
        "Fwd_IAT_Max": random.uniform(0, 100000),
        "Fwd_IAT_Min": random.uniform(0, 100000),
        "Bwd_IAT_Total": random.uniform(0, 100000),
        "Bwd_IAT_Mean": random.uniform(0, 100000),
        "Bwd_IAT_Std": random.uniform(0, 100000),
        "Bwd_IAT_Max": random.uniform(0, 100000),
        "Bwd_IAT_Min": random.uniform(0, 100000),
        "Fwd_Header_Length": random.randint(0, 1000),
        "Bwd_Header_Length": random.randint(0, 1000),
        "Fwd_Packets_s": random.uniform(0, 10000),           # Corrigido
        "Bwd_Packets_s": random.uniform(0, 10000),           # Corrigido
        "Min_Packet_Length": random.uniform(0, 1500),
        "Max_Packet_Length": random.uniform(0, 1500),
        "Packet_Length_Mean": random.uniform(0, 1500),
        "Packet_Length_Std": random.uniform(0, 500),
        "Packet_Length_Variance": random.uniform(0, 100000),
        "FIN_Flag_Count": random.randint(0, 1),
        "PSH_Flag_Count": random.randint(0, 1),
        "ACK_Flag_Count": random.randint(0, 1),
        "Average_Packet_Size": random.uniform(0, 1500),
        "Subflow_Fwd_Bytes": random.randint(0, 100000),
        "Init_Win_bytes_forward": random.randint(0, 65535),
        "Init_Win_bytes_backward": random.randint(0, 65535),
        "act_data_pkt_fwd": random.randint(0, 1000),
        "min_seg_size_forward": random.randint(0, 1000),
        "Active_Mean": random.uniform(0, 100000),
        "Active_Max": random.uniform(0, 100000),
        "Active_Min": random.uniform(0, 100000),
        "Idle_Mean": random.uniform(0, 100000),
        "Idle_Max": random.uniform(0, 100000),
        "Idle_Min": random.uniform(0, 100000)
    }

# --- Envio para a API ---
def enviar_log(features, token):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    try:
        response = requests.post(API_URL, json=features, headers=headers)
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
        features = gerar_log_simulado()
        enviar_log(features, token)
        time.sleep(INTERVALO_SEGUNDOS)
