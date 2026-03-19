from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

def evaluate_debate(history):

    prompt = f"""
You are a strict debate judge.

Evaluate ONLY the USER.

Be harsh and realistic.

Scoring rules:
- Logic: reasoning, rebuttal quality
- Clarity: structure and readability
- Strength: persuasiveness

IMPORTANT:
- Do NOT give average scores
- Use full range (0–10)
- Strong = 8–10
- Weak = 3–5

Return ONLY JSON:
{{
 "logic": number,
 "clarity": number,
 "strength": number,
 "winner": "User" or "AI",
 "weaknesses": ["..."],
 "suggestions": ["..."]
}}

Debate:
{history}
"""

    response = client.chat.completions.create(
        model="deepseek/deepseek-chat",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content