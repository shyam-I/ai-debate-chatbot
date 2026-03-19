from fastapi import APIRouter
from models.schemas import DebateRequest
from services.ai_service import generate_ai_response

router = APIRouter()

@router.post("/")
async def debate(req: DebateRequest):

    ai_reply = generate_ai_response(
        req.user_input,
        req.history,
        req.language   # ✅ PASS LANGUAGE
    )

    return {
        "ai_response": ai_reply
    }