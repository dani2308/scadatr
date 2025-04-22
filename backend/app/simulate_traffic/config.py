import os

# Caminho absoluto para o ficheiro CSV
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_CAMINHO = os.path.join(BASE_DIR, "cicids2017_cleaned.csv")

API_URL = "http://localhost:8000/predict"
LOGIN_URL = "http://localhost:8000/login"
EMAIL = "admin@scadatr.com"
PASSWORD = "1234"
INTERVALO_SEGUNDOS = 3

FEATURE_COLUMNS = [
    "Destination_Port", "Flow_Duration", "Total_Fwd_Packets",
    "Total_Length_of_Fwd_Packets", "Fwd_Packet_Length_Max",
    "Fwd_Packet_Length_Min", "Fwd_Packet_Length_Mean", "Fwd_Packet_Length_Std",
    "Bwd_Packet_Length_Max", "Bwd_Packet_Length_Min", "Bwd_Packet_Length_Mean",
    "Bwd_Packet_Length_Std", "Flow_Bytes_s", "Flow_Packets_s", "Flow_IAT_Mean",
    "Flow_IAT_Std", "Flow_IAT_Max", "Flow_IAT_Min", "Fwd_IAT_Total",
    "Fwd_IAT_Mean", "Fwd_IAT_Std", "Fwd_IAT_Max", "Fwd_IAT_Min",
    "Bwd_IAT_Total", "Bwd_IAT_Mean", "Bwd_IAT_Std", "Bwd_IAT_Max",
    "Bwd_IAT_Min", "Fwd_Header_Length", "Bwd_Header_Length", "Fwd_Packets_s",
    "Bwd_Packets_s", "Min_Packet_Length", "Max_Packet_Length",
    "Packet_Length_Mean", "Packet_Length_Std", "Packet_Length_Variance",
    "FIN_Flag_Count", "PSH_Flag_Count", "ACK_Flag_Count", "Average_Packet_Size",
    "Subflow_Fwd_Bytes", "Init_Win_bytes_forward", "Init_Win_bytes_backward",
    "act_data_pkt_fwd", "min_seg_size_forward", "Active_Mean", "Active_Max",
    "Active_Min", "Idle_Mean", "Idle_Max", "Idle_Min"
]
