import random
import time
import pandas as pd
from backend.app.simulate_traffic.config import FEATURE_COLUMNS, CSV_CAMINHO

# Lista de features que DEVEM ser inteiros
INTEGER_COLUMNS = [
    "Destination_Port", "Total_Fwd_Packets", "Fwd_Header_Length", "Bwd_Header_Length",
    "Subflow_Fwd_Bytes", "Init_Win_bytes_forward", "Init_Win_bytes_backward", "act_data_pkt_fwd",
    "min_seg_size_forward", "FIN_Flag_Count", "PSH_Flag_Count", "ACK_Flag_Count"
]

def gerar_log_simulado():
    """Gera um log completamente aleatório (não baseado em dataset)."""
    log = {}
    for col in FEATURE_COLUMNS:
        if col in INTEGER_COLUMNS:
            log[col] = random.randint(0, 5000)
        elif "Flag" in col or "act_data" in col:
            log[col] = random.randint(0, 1)
        elif "Length" in col or "Bytes" in col or "Size" in col or "Packet" in col:
            log[col] = round(random.uniform(100, 1500), 2)
        elif "Port" in col:
            log[col] = random.choice([80, 443, 21, 22, 8080, 3306])
        else:
            log[col] = round(random.uniform(0, 10000), 2)
    return log

def _preparar_dataset():
    """Carrega e prepara o dataset, corrigindo nomes e removendo nulos."""
    try:
        df = pd.read_csv(CSV_CAMINHO)
        df.columns = [col.replace(" ", "_").replace("/", "_") for col in df.columns]
        df = df.dropna()
        if 'Attack_Type' not in df.columns:
            raise ValueError("Coluna 'Attack_Type' não encontrada no CSV.")
        return df
    except Exception as e:
        print(f"❌ Erro ao preparar dataset: {e.__class__.__name__} - {e}")
        raise

def gerar_log_de_dataset(limite=None):
    """Gera logs diretamente do dataset, sem distinção de tipo."""
    try:
        df = _preparar_dataset()
        df = df[FEATURE_COLUMNS]
        if limite:
            df = df.sample(limite)
        for _, row in df.iterrows():
            log = row.to_dict()
            for col in INTEGER_COLUMNS:
                if col in log:
                    log[col] = int(round(log[col]))
            yield log
    except Exception as e:
        print(f"❌ Erro ao carregar logs do CSV: {e.__class__.__name__} - {e}")

def gerar_logs_mistos(n_ataques=5, n_normais=20):
    """Gera logs mistos (ataques e tráfego normal) do dataset."""
    try:
        df = _preparar_dataset()

        ataques_df = df[df['Attack_Type'] != 'Normal Traffic']
        normais_df = df[df['Attack_Type'] == 'Normal Traffic']

        if ataques_df.empty:
            print("⚠️ Nenhum ataque encontrado no dataset!")
        if normais_df.empty:
            print("⚠️ Nenhum tráfego normal encontrado no dataset!")

        ataques_amostra = ataques_df.sample(min(n_ataques, len(ataques_df)))
        normais_amostra = normais_df.sample(min(n_normais, len(normais_df)))

        combinado = pd.concat([ataques_amostra, normais_amostra])
        combinado = combinado.sample(frac=1).reset_index(drop=True)

        combinado = combinado[FEATURE_COLUMNS]

        for _, row in combinado.iterrows():
            log = row.to_dict()
            for col in INTEGER_COLUMNS:
                if col in log:
                    log[col] = int(round(log[col]))
            yield log

    except Exception as e:
        print(f"❌ Erro ao gerar logs mistos: {e.__class__.__name__} - {e}")

def gerar_logs_continuos_mistos(n_ataques=2, n_normais=10, intervalo=1.0):
    """Gera logs mistos continuamente com intervalo (ideal para demonstrações)."""
    while True:
        for log in gerar_logs_mistos(n_ataques, n_normais):
            yield log
            time.sleep(intervalo)
