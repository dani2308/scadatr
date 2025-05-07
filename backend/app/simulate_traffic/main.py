# app/simulate_traffic/main.py
import argparse
import time
from datetime import datetime

from backend.app.simulate_traffic.auth import obter_token_jwt
from backend.app.simulate_traffic.config import EMAIL, PASSWORD, INTERVALO_SEGUNDOS
from backend.app.simulate_traffic.simulador import (
    gerar_log_simulado,
    gerar_log_de_dataset,
    gerar_logs_mistos,
)
from backend.app.simulate_traffic.sender import enviar_log, guardar_log_ficheiro


def simular_trafego_aleatorio(token: str, intervalo: int):
    print("🚀 Início da simulação aleatória...")
    while True:
        log = gerar_log_simulado()
        if enviar_log(log, token):
            guardar_log_ficheiro(log)
        time.sleep(intervalo)


def simular_trafego_de_dataset(token: str, intervalo: int):
    print("📂 Início da simulação a partir do dataset...")
    for log in gerar_log_de_dataset():
        if enviar_log(log, token):
            guardar_log_ficheiro(log)
        time.sleep(intervalo)


def simular_trafego_misto(token: str, intervalo: int, n_ataques=5, n_normais=20):
    print(f"🔀 Início da simulação mista com {n_ataques} ataques e {n_normais} normais...")
    for log in gerar_logs_mistos(n_ataques=n_ataques, n_normais=n_normais):
        if enviar_log(log, token):
            guardar_log_ficheiro(log)
        time.sleep(intervalo)


def simular_trafego_demo_continuo(token: str, intervalo: int):
    print("🧪 Modo DEMO: envio contínuo de logs mistos (loop infinito)")
    while True:
        for log in gerar_logs_mistos(n_ataques=5, n_normais=10):
            if enviar_log(log, token):
                guardar_log_ficheiro(log)
            time.sleep(intervalo)


def main():
    parser = argparse.ArgumentParser(description="Simulador de tráfego de rede")
    parser.add_argument(
        "--modo",
        choices=["aleatorio", "dataset", "misto", "demo"],
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

    match args.modo:
        case "aleatorio":
            simular_trafego_aleatorio(token, args.intervalo)
        case "dataset":
            simular_trafego_de_dataset(token, args.intervalo)
        case "misto":
            simular_trafego_misto(token, args.intervalo, args.ataques, args.normais)
        case "demo":
            simular_trafego_demo_continuo(token, args.intervalo)


if __name__ == "__main__":
    main()

