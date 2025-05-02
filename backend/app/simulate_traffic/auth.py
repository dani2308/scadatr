# app/simulate_traffic/auth.py
import requests
from backend.app.simulate_traffic.config import LOGIN_URL

def obter_token_jwt(email, password):
    try:
        response = requests.post(
            LOGIN_URL,
            data={"username": email, "password": password},
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        response.raise_for_status()
        return response.json().get("access_token")
    except Exception as e:
        print("❌ Erro ao obter token JWT:", e)
        return None
