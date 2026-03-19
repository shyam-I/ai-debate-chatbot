from fastapi import APIRouter
from services.scoring_service import evaluate_debate

router = APIRouter()

@router.post("/")
async def evaluate(req: dict):
    print("RECEIVED DATA:", req)
    return req