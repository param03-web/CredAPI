from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base
from passlib.context import CryptContext
from jose import jwt

DATABASE_URL = "postgresql://postgres:Param@@123@localhost:5432/mydb"
SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

app = FastAPI()


def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])


@app.post("/signup")
def signup(user: UserCreate):
    db = SessionLocal()
    
    hashed_pw = hash_password(user.password)
    
    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_pw
    )
    
    db.add(new_user)
    db.commit()
    
    return {"message": "User created successfully"}


@app.post("/login")
def login(user: UserLogin):
    db = SessionLocal()
    
    db_user = db.query(User).filter(User.username == user.username).first()
    
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")
    
    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Wrong password")
    
    token = create_token({"username": db_user.username})
    
    return {"access_token": token}


@app.get("/protected")
def protected(token: str):
    try:
        data = decode_token(token)
        return {"message": f"Welcome {data['username']}"}
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
