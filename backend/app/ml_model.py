import joblib
import numpy as np
import pandas as pd
from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parent / "models" / "random_forest_model.pkl"
SCALER_PATH = Path(__file__).resolve().parent / "models" / "scaler.pkl"

# Carregar modelo e scaler
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)


# Lista de features usada durante o treino (ordem correta)
FEATURE_COLUMNS = [
    "Destination Port", "Flow Duration", "Total Fwd Packets", "Total Length of Fwd Packets",
    "Fwd Packet Length Max", "Fwd Packet Length Min", "Fwd Packet Length Mean", "Fwd Packet Length Std",
    "Bwd Packet Length Max", "Bwd Packet Length Min", "Bwd Packet Length Mean", "Bwd Packet Length Std",
    "Flow Bytes/s", "Flow Packets/s", "Flow IAT Mean", "Flow IAT Std", "Flow IAT Max", "Flow IAT Min",
    "Fwd IAT Total", "Fwd IAT Mean", "Fwd IAT Std", "Fwd IAT Max", "Fwd IAT Min",
    "Bwd IAT Total", "Bwd IAT Mean", "Bwd IAT Std", "Bwd IAT Max", "Bwd IAT Min",
    "Fwd Header Length", "Bwd Header Length", "Fwd Packets/s", "Bwd Packets/s",
    "Min Packet Length", "Max Packet Length", "Packet Length Mean", "Packet Length Std", "Packet Length Variance",
    "FIN Flag Count", "PSH Flag Count", "ACK Flag Count", "Average Packet Size",
    "Subflow Fwd Bytes", "Init_Win_bytes_forward", "Init_Win_bytes_backward", "act_data_pkt_fwd",
    "min_seg_size_forward", "Active Mean", "Active Max", "Active Min", "Idle Mean", "Idle Max", "Idle Min"
]

def predict_traffic(data_dict: dict) -> str:
    try:
        # Garantir que todos os campos estão presentes e na ordem certa
        features = [data_dict.get(col, 0) for col in FEATURE_COLUMNS]

        # Converter para DataFrame para compatibilidade com o scaler
        df = pd.DataFrame([features], columns=FEATURE_COLUMNS)

        # Escalar os dados
        scaled_features = scaler.transform(df)

        # Fazer a predição
        prediction = model.predict(scaled_features)[0]

        return prediction
    except Exception as e:
        print("Erro na predição:", e)
        return "Error"
