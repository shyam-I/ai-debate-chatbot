from openai import OpenAI
import os
from dotenv import load_dotenv
from utils.prompts import debate_prompt

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

def generate_ai_response(user_input, history, language):

    # 🔥 SMART INPUT CHECK (UX IMPROVEMENT)
    if len(user_input.strip().split()) < 3:
        return "Please provide a clear argument to start the debate. For example: 'AI is dangerous' or 'Social media is harmful.'"

    prompt = debate_prompt(user_input, history)

    try:
        response = client.chat.completions.create(
    model="deepseek/deepseek-chat",
    messages=[
        {
             "role": "system",
            "content": f"""
You are a professional debate opponent.

Rules:
- Respond ONLY in {language}
- Keep response SHORT (max 4–5 lines)
- Use bullet points (•)
- Be sharp and logical

Format:

Against:
• Point 1
• Point 2

Counter-question:
...
"""
        },
        {
            "role": "user",
            "content": prompt
        }
    ]
)

        return response.choices[0].message.content

    except Exception as e:
        print("AI ERROR:", e)

        # 🔥 FALLBACK RESPONSE (VERY IMPORTANT)
        return "I’m having trouble generating a response right now, but your argument seems interesting. Could you elaborate more?"