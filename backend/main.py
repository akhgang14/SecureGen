from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from pydantic import BaseModel

from password_generator import generate_password


app = FastAPI(
    title="SecureGen API",
    description="Secure password generation API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PasswordRequest(BaseModel):
    length: int
    use_upper: bool = True
    use_lower: bool = True
    use_digits: bool = True
    use_symbols: bool = True


@app.get("/")
def home():
    return {
        "message": "SecureGen API is running!"
    }


@app.post("/generate")
def generate(request: PasswordRequest):

    try:
        password = generate_password(
            length=request.length,
            use_upper=request.use_upper,
            use_lower=request.use_lower,
            use_digits=request.use_digits,
            use_symbols=request.use_symbols
        )

        return {
            "password": password,
            "length": len(password)
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )