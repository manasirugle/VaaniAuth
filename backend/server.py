# ------------------------------------------------------------
# Environment Fixes (Must be before speechbrain imports)
# ------------------------------------------------------------

import os
import sys
from unittest.mock import MagicMock

# --- SHIELD: Prevent SpeechBrain 1.1 lazy-loader from crashing during librosa/inspect ---
# These mocks prevent optional integrations from failing during import inspection.
for mock_mod in [
    "k2", 
    "speechbrain.integrations.k2_fsa", 
    "speechbrain.integrations.huggingface",
    "speechbrain.integrations.nlp",
    "speechbrain.integrations.huggingface.wordemb",
]:
    if mock_mod not in sys.modules:
        sys.modules[mock_mod] = MagicMock()

# Fix for Conda/SSL_CERT_FILE misconfigurations on Windows
if "SSL_CERT_FILE" in os.environ:
    cert_path = os.environ["SSL_CERT_FILE"]
    if not os.path.exists(cert_path):
        del os.environ["SSL_CERT_FILE"]

# ------------------------------------------------------------
# Imports
# ------------------------------------------------------------
import os
import shutil
import uuid
import json
import random
import traceback
import math
from datetime import datetime

from fastapi import FastAPI, UploadFile, File, Form, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from speechbrain_improved import register_user, verify_user
from whisper_service import verify_challenge_phrase
from fraud_detection import detect_voice_fraud
from risk_engine import calculate_final_risk

# ------------------------------------------------------------
# Helper: JSON Safe Serialization
# ------------------------------------------------------------

def json_safe(data):
    """Recursively converts NaN/Inf values to 0.0 for JSON compatibility."""
    if isinstance(data, dict):
        return {k: json_safe(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [json_safe(v) for v in data]
    elif isinstance(data, float):
        if math.isnan(data) or math.isinf(data):
            return 0.0
        return data
    return data

# ------------------------------------------------------------
# Configuration from Environment Variables
# ------------------------------------------------------------

MONGODB_URI = os.environ.get("MONGODB_URI", "mongodb://localhost:27017/vaaniauth")
API_SECRET_KEY = os.environ.get("API_SECRET_KEY", "dev_secret_key")
JWT_SECRET = os.environ.get("JWT_SECRET", "dev_jwt_secret")
JWT_EXPIRY_HOURS = int(os.environ.get("JWT_EXPIRY_HOURS", "24"))
MAX_AUDIO_SIZE_MB = int(os.environ.get("MAX_AUDIO_SIZE_MB", "10"))
UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER", "temp_audio")
ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
RATE_LIMIT_PER_MINUTE = int(os.environ.get("RATE_LIMIT_PER_MINUTE", "100"))

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

DEFAULT_CHALLENGE_PHRASE = "secure banking for everyone"

# ------------------------------------------------------------
# FastAPI App
# ------------------------------------------------------------

app = FastAPI(
    title="VaaniAuth Voice Authentication API",
    description="Voice-based registration, liveness, fraud detection and authentication",
    version="1.0.0"
)

# ------------------------------------------------------------
# CORS
# ------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------
# Helper Functions
# ------------------------------------------------------------

def save_uploaded_file(file: UploadFile):
    """Saves uploaded file to temp folder and returns path."""
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return file_path

def generate_mock_jwt():
    """Generate a mock JWT token for demo purposes."""
    return f"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.{uuid.uuid4().hex[:32]}.{uuid.uuid4().hex[:16]}"

# ------------------------------------------------------------
# Root Endpoint
# ------------------------------------------------------------

@app.get("/")
def root():
    return {
        "status": "success",
        "message": "VaaniAuth Backend Running",
        "version": "1.0.0"
    }

# ------------------------------------------------------------
# Register Endpoint
# ------------------------------------------------------------

@app.post("/register")
async def register(
    user_id: str = Form(...),
    audio: UploadFile = File(...)
):
    """Registers a user voice embedding."""
    try:
        audio_path = save_uploaded_file(audio)
        register_result = register_user(user_id=user_id, audio_path=audio_path)
        return JSONResponse(register_result)
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": str(e)}
        )

# ------------------------------------------------------------
# Authenticate Endpoint
# ------------------------------------------------------------

@app.post("/authenticate")
async def authenticate(
    user_id: str = Form(...),
    audio: UploadFile = File(...),
    challenge_phrase: str = Form(DEFAULT_CHALLENGE_PHRASE)
):
    """
    Full authentication pipeline:
    1. Speaker Verification
    2. Liveness / Challenge Phrase
    3. Fraud Detection
    4. Risk Engine
    """
    try:
        audio_path = save_uploaded_file(audio)

        # 1. Speaker Verification
        speaker_result = verify_user(user_id=user_id, audio_path=audio_path)
        if speaker_result["status"] == "error":
            return JSONResponse(status_code=400, content=speaker_result)

        # 2. Challenge Phrase / Liveness
        phrase_result = verify_challenge_phrase(
            audio_path=audio_path, challenge_phrase=challenge_phrase
        )
        if phrase_result["status"] == "error":
            return JSONResponse(status_code=400, content=phrase_result)

        # 3. Fraud / Replay Detection
        fraud_result = detect_voice_fraud(audio_path)
        if fraud_result["fraud_label"] == "natural_voice":
            fraud_result["decision"] = "accepted"
        elif fraud_result["fraud_label"] == "suspicious":
            fraud_result["decision"] = "suspicious"
        else:
            fraud_result["decision"] = "rejected"

        # 4. Final Risk Calculation
        risk_result = calculate_final_risk(
            speaker_result=speaker_result,
            phrase_result=phrase_result,
            fraud_result=fraud_result
        )

        return json_safe({
            "status": "success",
            "user_id": user_id,
            "speaker_score": speaker_result["similarity_score"],
            "speaker_confidence": speaker_result["confidence"],
            "speaker_decision": speaker_result["decision"],
            "challenge_phrase": challenge_phrase,
            "spoken_phrase": phrase_result["spoken_phrase"],
            "phrase_match": phrase_result["phrase_match"],
            "fraud_score": fraud_result["fraud_score"],
            "fraud_label": fraud_result["fraud_label"],
            "fraud_decision": fraud_result["decision"],
            "fraud_reasons": fraud_result["reasons"],
            "risk_score": risk_result["risk_score"],
            "final_decision": risk_result["decision"],
            "risk_reasons": risk_result["reasons"],
            "token": generate_mock_jwt()
        })
    except Exception as e:
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": str(e)}
        )

# ------------------------------------------------------------
# Continuous Authentication Endpoint
# ------------------------------------------------------------

@app.post("/continuous-auth")
async def continuous_auth(
    user_id: str = Form(...),
    audio: UploadFile = File(...)
):
    """Simulates continuous authentication during a session."""
    try:
        audio_path = save_uploaded_file(audio)
        speaker_result = verify_user(user_id=user_id, audio_path=audio_path)

        if speaker_result["decision"] == "accepted":
            session_status = "session_verified"
        elif speaker_result["decision"] == "suspicious":
            session_status = "reverify_required"
        else:
            session_status = "session_locked"

        return {
            "status": "success",
            "user_id": user_id,
            "speaker_score": speaker_result["similarity_score"],
            "speaker_decision": speaker_result["decision"],
            "session_status": session_status
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": str(e)}
        )

# ------------------------------------------------------------
# Dashboard API — Placeholder Endpoints
# ------------------------------------------------------------

@app.get("/api/dashboard/stats")
async def dashboard_stats():
    """Returns mock dashboard statistics."""
    return {
        "requests_today": random.randint(10000, 15000),
        "success_rate": round(random.uniform(95, 99), 1),
        "fraud_blocked": random.randint(200, 500),
        "avg_latency_ms": random.randint(100, 200),
        "active_users": random.randint(1500, 3000),
        "total_registered": random.randint(5000, 10000),
    }

@app.get("/api/dashboard/traffic")
async def dashboard_traffic():
    """Returns mock hourly traffic data for charts."""
    data = []
    for i in range(24):
        data.append({
            "hour": f"{i:02d}:00",
            "requests": random.randint(200, 1000),
            "success": random.randint(180, 900),
            "failed": random.randint(5, 50),
        })
    return {"data": data}

@app.get("/api/dashboard/recent-logs")
async def dashboard_recent_logs():
    """Returns mock recent authentication logs."""
    statuses = ["success", "success", "success", "success", "blocked", "suspicious"]
    logs = []
    for i in range(10):
        logs.append({
            "id": f"req_{uuid.uuid4().hex[:4]}",
            "user_id": f"user_{random.randint(1000, 9999)}",
            "status": random.choice(statuses),
            "confidence": round(random.uniform(0.3, 0.99), 2),
            "risk_score": random.randint(1, 95),
            "timestamp": datetime.now().isoformat(),
        })
    return {"logs": logs}

@app.get("/api/dashboard/risk-distribution")
async def dashboard_risk_distribution():
    """Returns mock risk score distribution."""
    return {
        "low": random.randint(60, 80),
        "medium": random.randint(10, 25),
        "high": random.randint(3, 10),
        "blocked": random.randint(1, 5),
    }

# ------------------------------------------------------------
# Health Check
# ------------------------------------------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "server": "running",
        "version": "1.0.0",
        "environment": "development" if API_SECRET_KEY == "dev_secret_key" else "production"
    }