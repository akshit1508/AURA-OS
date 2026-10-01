from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

from .engine import generate_aura_response

# Load environment variables
load_dotenv()

app = FastAPI(
    title="AURA AI Microservice",
    description="Intelligent AI Assistant Service for Akshit Bhandari's Portfolio",
    version="1.0.0"
)

# Enable CORS for frontend & backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

provider = os.getenv("AI_PROVIDER", "knowledge-engine")


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str
    status: str


@app.get("/")
def home():
    return {
        "service": "AURA AI Service",
        "status": "running",
        "provider": provider
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/ai/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    """
    Primary chat endpoint called by Spring Boot (POST /ai/chat).
    Takes {"message": "user question"} and returns {"response": "...", "status": "success"}.
    """
    try:
        user_message = request.message or ""
        ai_reply = generate_aura_response(user_message)

        return ChatResponse(
            response=ai_reply,
            status="success"
        )
    except Exception as exc:
        print(f"Error processing chat message: {exc}")
        return ChatResponse(
            response=(
                "I encountered an issue processing your question. "
                "Akshit Bhandari is an AI Engineer and Java Backend Developer specializing in "
                "Spring Boot, Python, React, and MySQL. Please ask about MESSO, Medi-Vault, or his skills!"
            ),
            status="success"
        )