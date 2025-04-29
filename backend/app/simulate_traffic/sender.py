# app/simulate_traffic/sender.py
import requests
import json
from app.simulate_traffic.config import API_URL

def enviar_log(log, token, verbose=True):
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.post(API_URL, json=log, headers=headers)
        if response.status_code == 200:
            if verbose:
                print("✅ Log enviado com sucesso:", response.json())
            return True
        else:
            print(f"⚠️ Erro ao enviar log [{response.status_code}]: {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Erro de conexão: {type(e).__name__} - {e}")
        return False

def guardar_log_ficheiro(log, caminho="logs_simulados.jsonl"):
    """Guarda o log no ficheiro especificado em formato JSONL."""
    try:
        with open(caminho, "a") as f:
            f.write(json.dumps(log) + "\n")
    except Exception as e:
        print(f"❌ Erro ao guardar log no ficheiro: {type(e).__name__} - {e}")
