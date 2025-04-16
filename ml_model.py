# ml_model.py
import joblib
import numpy as np

# Carregar modelo e scaler
rf_model = joblib.load("random_forest_model.pkl")
scaler = joblib.load("scaler.pkl")

# Função para prever
def predict_traffic(data: dict) -> str:
    # Converter para array e normalizar
    feature_values = np.array([list(data.values())])
    feature_scaled = scaler.transform(feature_values)
    
    # Prever
    prediction = rf_model.predict(feature_scaled)[0]
    return prediction  # "Normal Traffic" ou "Attack"
