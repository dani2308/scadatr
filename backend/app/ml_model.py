# ml_model.py
import os
import joblib
import numpy as np

# Caminho relativo ao próprio ficheiro
BASE_DIR = os.path.dirname(__file__)

# Carregar modelo e scaler
rf_model = joblib.load(os.path.join(BASE_DIR, "random_forest_model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "scaler.pkl"))

# Função para prever
def predict_traffic(data: dict) -> str:
    # Converter para array e normalizar
    feature_values = np.array([list(data.values())])
    feature_scaled = scaler.transform(feature_values)
    
    # Prever
    prediction = rf_model.predict(feature_scaled)[0]
    return prediction  # "Normal Traffic" ou "Attack"

def predict_with_models(data: dict) -> str:
    # Placeholder — substitui depois por lógica com múltiplos modelos
    return predict_traffic(data)
