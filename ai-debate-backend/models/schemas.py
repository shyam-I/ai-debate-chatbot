from pydantic import BaseModel
from typing import List, Dict

class Message(BaseModel):
    role: str
    content: str

class DebateRequest(BaseModel):
    user_input: str
    history: List[Dict]
    language: str = "English"

class DebateResponse(BaseModel):
    ai_response: str