import pandas as pd
from app.simulate_traffic.config import CSV_CAMINHO

df = pd.read_csv(CSV_CAMINHO)
df.columns = [col.replace(" ", "_").replace("/", "_") for col in df.columns]
print(df[['Attack_Type']].value_counts())
print(df.head(10))
