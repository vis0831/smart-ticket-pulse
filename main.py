# main.py
import os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
import datetime


# --- Configuration ---
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# --- Database Setup (SQLAlchemy) ---
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# --- SQLAlchemy DB Model ---
class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(Integer, primary_key=True, index=True)
    source_system = Column(String, index=True)
    created_by = Column(String, index=True)
    subject = Column(String)
    description = Column(String)
    priority = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


# --- Pydantic API Models ---
class TicketCreate(BaseModel):
    source_system: str
    created_by: str
    subject: str
    description: str
    priority: Optional[str] = None

class TicketResponse(TicketCreate):
    id: int
    created_at: datetime.datetime
    class Config:
        orm_mode = True


# --- FastAPI Application ---
app = FastAPI(title="Unified Helpdesk API", version="1.0")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/api/v1/tickets/", response_model=TicketResponse, status_code=201)
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    db_ticket = Ticket(**ticket.dict())
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket


@app.on_event("startup")
def on_startup():
    print("Application startup: Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created.")