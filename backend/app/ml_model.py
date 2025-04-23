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
    "Destination_Port", "Flow_Duration", "Total_Fwd_Packets", "Total_Length_of_Fwd_Packets",
    "Fwd_Packet_Length_Max", "Fwd_Packet_Length_Min", "Fwd_Packet_Length_Mean", "Fwd_Packet_Length_Std",
    "Bwd_Packet_Length_Max", "Bwd_Packet_Length_Min", "Bwd_Packet_Length_Mean", "Bwd_Packet_Length_Std",
    "Flow_Bytes/s", "Flow_Packets/s", "Flow_IAT_Mean", "Flow_IAT_Std", "Flow_IAT_Max", "Flow_IAT_Min",
    "Fwd_IAT_Total", "Fwd_IAT_Mean", "Fwd_IAT_Std", "Fwd_IAT_Max", "Fwd_IAT_Min",
    "Bwd_IAT_Total", "Bwd_IAT_Mean", "Bwd_IAT_Std", "Bwd_IAT_Max", "Bwd_IAT_Min",
    "Fwd_Header_Length", "Bwd_Header_Length", "Fwd_Packets/s", "Bwd_Packets/s",
    "Min_Packet_Length", "Max_Packet_Length", "Packet_Length_Mean", "Packet_Length_Std", "Packet_Length_Variance",
    "FIN_Flag_Count", "PSH_Flag_Count", "ACK_Flag_Count", "Average_Packet_Size",
    "Subflow_Fwd_Bytes", "Init_Win_bytes_forward", "Init_Win_bytes_backward", "act_data_pkt_fwd",
    "min_seg_size_forward", "Active_Mean", "Active_Max", "Active_Min", "Idle_Mean", "Idle_Max", "Idle_Min"
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
