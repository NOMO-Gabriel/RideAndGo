import uuid
import os
import hashlib
import time
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from utils import *

# Configuration
port = int(os.environ.get("PORT", 5000))
DRIVERS_FILE = 'drivers.pkl'
PASSENGERS_FILE = 'passengers.pkl'

# Initialiser FastAPI
app = FastAPI()

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://rideandgo.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Stockage temporaire des tokens
active_sessions = {}

class RegisterModel(BaseModel):
    username: str
    email: str
    password: str
    phone_number: str
    first_name: str
    last_name: str
    birthdate: str
    sex: str
    role: str

class LoginModel(BaseModel):
    identifier: str
    password: str

class LocalisationModel(BaseModel):
    token: str
    longitude: float
    latitude: float


class CostRequest(BaseModel):
    start: str
    end: str
    hour: str

class CostResponse(BaseModel):
    cost: float
    distance: float
    start: str
    end: str
    mint_cost: float


@app.post("/cost", response_model=CostResponse)
def cost(request: CostRequest):
    """
    Calcule le coût estimé d'une course en fonction des paramètres fournis.
    """
    try:
        start = request.start
        end = request.end
        hour = request.hour

        data = get_data(start, end, hour)
        start_lon, start_lat = get_coordinates(start)
        end_lon, end_lat = get_coordinates(end)
        distance = calculate_distance(start_lon, start_lat, end_lon, end_lat)
        cost = calculate_cost(data)

        mint_cost = 350  # Coût minimum

        return CostResponse(
            cost=cost.item() if hasattr(cost, 'item') else cost,
            distance=distance,
            start=start,
            end=end,
            mint_cost=mint_cost
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
def welcome():
    return {"message": "Bienvenue sur l'API de recommandation des clients et chauffeurs pour Ride and Go."}

@app.post("/register")
def register(user: RegisterModel):
    if user.role not in ["driver", "passenger"]:
        raise HTTPException(status_code=400, detail="Rôle invalide")
    
    file_path = DRIVERS_FILE if user.role == "driver" else PASSENGERS_FILE
    users = load_data(file_path)
    
    if user.username in users:
        raise HTTPException(status_code=400, detail="Cet utilisateur existe déjà")
    
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
    
    new_user = {
        "personal_info": user.dict(),
        "localisation": {"longitude": None, "latitude": None},
    }
    if user.role == "driver":
        new_user.update({"rating": 0, "routes": []})
    else:
        new_user.update({"travel": {"start_lon": None, "start_lat": None, "end_lon": None, "end_lat": None}})
    
    users.append(new_user)
    save_data(file_path, users)
    return {"message": f"Utilisateur {user.role} enregistré avec succès"}

@app.post("/login")
def login(credentials: LoginModel):
    users = load_data(DRIVERS_FILE) + load_data(PASSENGERS_FILE)
    hashed_password = hashlib.sha256(credentials.password.encode()).hexdigest()
    
    for user in users:
        personal_info = user["personal_info"]
        if credentials.identifier in [personal_info["email"], personal_info["username"], personal_info["phone_number"]]:
            if personal_info["password"] == hashed_password:
                token = str(uuid.uuid4())
                active_sessions[token] = personal_info["username"]
                return {"message": "Connexion réussie", "token": token, "role": personal_info["role"]}
    
    raise HTTPException(status_code=401, detail="Identifiants incorrects")

@app.post("/set_localisation")
def set_localisation(loc: LocalisationModel):
    if loc.token not in active_sessions:
        raise HTTPException(status_code=401, detail="Token invalide")
    
    username = active_sessions[loc.token]
    drivers = load_data(DRIVERS_FILE)
    passengers = load_data(PASSENGERS_FILE)
    
    users, file_path = (drivers, DRIVERS_FILE) if username in drivers else (passengers, PASSENGERS_FILE)
    
    users[username]["localisation"] = {"longitude": loc.longitude, "latitude": loc.latitude}
    save_data(file_path, users)
    return {"message": "Localisation mise à jour avec succès"}

@app.get("/get_localisation")
def get_localisation(authorization: Optional[str] = Header(None)):
    if not authorization or authorization not in active_sessions:
        raise HTTPException(status_code=401, detail="Token invalide")
    
    username = active_sessions[authorization]
    users = load_data(DRIVERS_FILE) + load_data(PASSENGERS_FILE)
    for user in users:
        if user["personal_info"]["username"] == username:
            return user.get("localisation", {"message": "Localisation non trouvée"})
    
    raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    
def calculate_cost(data):
    return model.predict(data)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=port)
