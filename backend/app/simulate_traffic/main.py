# app/simulate_traffic/main.py
import argparse
import time
from datetime import datetime

from app.simulate_traffic.auth import obter_token_jwt
from app.simulate_traffic.config import EMAIL, PASSWORD, INTERVALO_SEGUNDOS
from app.simulate_traffic.simulador import (
    gerar_log_simulado,
    gerar_log_de_dataset,
    gerar_logs_mistos,
)
from app.simulate_traffic.sender import enviar_log


def simular_trafego_aleatorio(token: str, intervalo: int):
    print("🚀 Início da simulação aleatória...")
    while True:
        log = gerar_log_simulado()
        enviar_log(log, token)
        time.sleep(intervalo)


def simular_trafego_de_dataset(token: str, intervalo: int):
    print("📂 Início da simulação a partir do dataset...")
    for log in gerar_log_de_dataset():
        enviar_log(log, token)
        time.sleep(intervalo)


def simular_trafego_misto(token: str, intervalo: int, n_ataques=5, n_normais=20):
    print(f"🔀 Início da simulação mista com {n_ataques} ataques e {n_normais} normais...")
    for log in gerar_logs_mistos(n_ataques=n_ataques, n_normais=n_normais):
        enviar_log(log, token)
        time.sleep(intervalo)


def main():
    parser = argparse.ArgumentParser(description="Simulador de tráfego de rede")
    parser.add_argument(
        "--modo",
        choices=["aleatorio", "dataset", "misto"],
        default="aleatorio",
        help="Modo de simulação",
    )
    parser.add_argument(
        "--intervalo",
        type=int,
        default=INTERVALO_SEGUNDOS,
        help="Intervalo entre envios (segundos)",
    )
    parser.add_argument(
        "--ataques",
        type=int,
        default=5,
        help="Número de logs de ataque (modo misto)",
    )
    parser.add_argument(
        "--normais",
        type=int,
        default=20,
        help="Número de logs normais (modo misto)",
    )
    args = parser.parse_args()

    print(f"🕒 Início: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    token = obter_token_jwt(EMAIL, PASSWORD)
    if not token:
        print("⛔ Token inválido. Encerrando.")
        return

    if args.modo == "aleatorio":
        simular_trafego_aleatorio(token, args.intervalo)
    elif args.modo == "dataset":
        simular_trafego_de_dataset(token, args.intervalo)
    elif args.modo == "misto":
        simular_trafego_misto(token, args.intervalo, args.ataques, args.normais)


if __name__ == "__main__":
    main()
