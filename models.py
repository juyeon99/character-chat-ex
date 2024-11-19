from pydantic import BaseModel

# /chat request 모델
class ChatRequest(BaseModel):
    user_id: int
    conversation_id: int
    question: str
    character_id: int
    character_name: str

# /chat response 모델
class ChatResponse(BaseModel):
    answer: str