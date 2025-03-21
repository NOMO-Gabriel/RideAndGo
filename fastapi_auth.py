from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, validator
from sqlalchemy import Boolean, Column, Integer, String, Date, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import date, datetime
from passlib.context import CryptContext
from typing import Optional
import secrets
from fastapi.security import OAuth2PasswordBearer

# Add these imports to your existing FastAPI file
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from jose import JWTError, jwt
import os
from typing import Optional, Union

# Add these constants for JWT token handling
# Generate a secure secret key with: openssl rand -hex 32
SECRET_KEY = os.getenv("SECRET_KEY", "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# FastAPI app
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your Next.js app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./rideshare.db"
# For PostgreSQL use something like:
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/dbname"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Add these models for authentication
class TokenData(BaseModel):
    user_id: Optional[int] = None

class LoginRequest(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    is_driver: bool
    user_name: str

# Response model
class UserResponse(BaseModel):
    id: int
    pseudo: str
    email: str
    name: str
    surname: str
    is_driver: bool

    class Config:
        orm_mode = True

# Login request model
class LoginRequest(BaseModel):
    email: str
    password: str

# Token response model
class Token(BaseModel):
    access_token: str
    token_type: str


# User model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    pseudo = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    phone_number = Column(String)
    name = Column(String)
    surname = Column(String)
    birthday = Column(Date)
    gender = Column(String)
    is_driver = Column(Boolean, default=False)
    created_at = Column(DateTime)

# Create tables
Base.metadata.create_all(bind=engine)


# User registration model
class UserCreate(BaseModel):
    pseudo: str
    email: EmailStr
    password: str
    phoneNumber: str
    name: str
    surname: str
    birthday: str
    gender: str
    isDriver: bool

    @validator('gender')
    def validate_gender(cls, v):
        if v not in ["MALE", "FEMALE"]:
            raise ValueError('Gender must be either MALE or FEMALE')
        return v



# OAuth2 password bearer for token validation
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

# Function to create JWT tokens
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Function to authenticate users
def authenticate_user(db: Session, identifier: str, password: str):
    # Attempt to find user by email
    user = db.query(User).filter(User.email == identifier).first()
    
    # If not found by email, try by phone number
    if not user:
        user = db.query(User).filter(User.phone_number == identifier).first()
    
    # If still not found, try by username (pseudo)
    if not user:
        user = db.query(User).filter(User.pseudo == identifier).first()
    
    # If user not found with any identifier, return None
    if not user:
        return None
    
    # Verify password
    if not pwd_context.verify(password, user.hashed_password):
        return None
    
    return user

# Login endpoint
@app.post("/api/login", response_model=Token)
async def login_for_access_token(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, login_data.email, login_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Identifiant ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, 
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "is_driver": user.is_driver,
        "user_name": user.name
    }

# Get current user from token
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        token_data = TokenData(user_id=int(user_id))
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == token_data.user_id).first()
    if user is None:
        raise credentials_exception
    return user

# Example of a protected route
@app.get("/api/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


@app.post("/api/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    db_user_email = db.query(User).filter(User.email == user.email).first()
    if db_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if username already exists
    db_user_pseudo = db.query(User).filter(User.pseudo == user.pseudo).first()
    if db_user_pseudo:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Convert birthday string to date
    try:
        birthday_date = datetime.strptime(user.birthday, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    # Hash the password
    hashed_password = pwd_context.hash(user.password)
    
    # Create new user
    new_user = User(
        pseudo=user.pseudo,
        email=user.email,
        hashed_password=hashed_password,
        phone_number=user.phoneNumber,
        name=user.name,
        surname=user.surname,
        birthday=birthday_date,
        gender=user.gender,
        is_driver=user.isDriver,
        created_at=datetime.now()
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)