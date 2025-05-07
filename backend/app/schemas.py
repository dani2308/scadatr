from pydantic import BaseModel, root_validator
from datetime import datetime
from typing import Optional
import random

def gerar_ip():
    return ".".join(str(random.randint(0, 255)) for _ in range(4))

def gerar_protocolo():
    return random.choice(["TCP", "UDP", "ICMP", "IGMP"])

# --- Token ---
class Token(BaseModel):
    access_token: str
    token_type: str

# --- User ---
class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# --- Log ---
class LogCreate(BaseModel):
    timestamp: Optional[datetime] = None
    source_ip: str
    destination_ip: str
    protocol: str
    packet_size: int
    prediction: str

class LogResponse(LogCreate):
    id: int
    user_id: int

    class Config:
        orm_mode = True

# --- Alert ---
class AlertCreate(BaseModel):
    timestamp: Optional[datetime] = None
    description: str
    severity: str

class AlertResponse(AlertCreate):
    id: int
    user_id: int

    class Config:
        orm_mode = True
        
# --- Prediction ---
class PredictionInput(BaseModel):
    Destination_Port: int
    Flow_Duration: float
    Total_Fwd_Packets: int
    Total_Length_of_Fwd_Packets: float
    Fwd_Packet_Length_Max: float
    Fwd_Packet_Length_Min: float
    Fwd_Packet_Length_Mean: float
    Fwd_Packet_Length_Std: float
    Bwd_Packet_Length_Max: float
    Bwd_Packet_Length_Min: float
    Bwd_Packet_Length_Mean: float
    Bwd_Packet_Length_Std: float
    Flow_Bytes_s: float
    Flow_Packets_s: float
    Flow_IAT_Mean: float
    Flow_IAT_Std: float
    Flow_IAT_Max: float
    Flow_IAT_Min: float
    Fwd_IAT_Total: float
    Fwd_IAT_Mean: float
    Fwd_IAT_Std: float
    Fwd_IAT_Max: float
    Fwd_IAT_Min: float
    Bwd_IAT_Total: float
    Bwd_IAT_Mean: float
    Bwd_IAT_Std: float
    Bwd_IAT_Max: float
    Bwd_IAT_Min: float
    Fwd_Header_Length: int
    Bwd_Header_Length: int
    Fwd_Packets_s: float
    Bwd_Packets_s: float
    Min_Packet_Length: float
    Max_Packet_Length: float
    Packet_Length_Mean: float
    Packet_Length_Std: float
    Packet_Length_Variance: float
    FIN_Flag_Count: int
    PSH_Flag_Count: int
    ACK_Flag_Count: int
    Average_Packet_Size: float
    Subflow_Fwd_Bytes: int
    Init_Win_bytes_forward: int
    Init_Win_bytes_backward: int
    act_data_pkt_fwd: int
    min_seg_size_forward: int
    Active_Mean: float
    Active_Max: float
    Active_Min: float
    Idle_Mean: float
    Idle_Max: float
    Idle_Min: float
    source_ip: Optional[str]
    destination_ip: Optional[str]
    protocol: Optional[str]

    @root_validator(pre=True)
    def fill_defaults(cls, values):
        if 'source_ip' not in values or values['source_ip'] is None:
            values['source_ip'] = gerar_ip()
        if 'destination_ip' not in values or values['destination_ip'] is None:
            values['destination_ip'] = gerar_ip()
        if 'protocol' not in values or values['protocol'] is None:
            values['protocol'] = gerar_protocolo()
        return values

class PredictionResponse(BaseModel):
    prediction: str
    log_id: Optional[int]
