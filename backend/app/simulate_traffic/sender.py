# app/simulate_traffic/sender.py
import requests
import json
from app.simulate_traffic.config import API_URL

def enviar_log(log, token):
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.post(API_URL, json=log, headers=headers)
        if response.status_code == 200:
            print("✅ Log enviado com sucesso:", response.json())
            return True
        else:
            print("⚠️ Erro ao enviar log:", response.status_code, response.text)
            return False
    except Exception as e:
        print("❌ Erro de conexão:", e)
        return False

def guardar_log_ficheiro(log, caminho="logs_simulados.jsonl"):
    with open(caminho, "a") as f:
        f.write(json.dumps(log) + "\n")
