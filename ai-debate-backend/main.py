from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from route import debate
from route import evaluation



app = FastAPI()
app.include_router(evaluation.router, prefix="/evaluate")
# CORS (frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(debate.router, prefix="/debate")

@app.get("/")
def home():
    return {"message": "AI Debate Backend Running 🚀"}