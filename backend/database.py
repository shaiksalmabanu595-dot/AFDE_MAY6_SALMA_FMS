"""
Database configuration module.

Sets up the SQLAlchemy engine, session factory, and declarative base
for the Feedback Management System. SQLite is used for Phase 1 as
recommended by the project specification.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# SQLite database file lives in the project's database/ folder so it
# can be inspected, backed up, or version-controlled if needed.
SQLALCHEMY_DATABASE_URL = "sqlite:///../database/feedback.db"

# check_same_thread=False is required for SQLite when used with FastAPI,
# because FastAPI may use multiple threads for a single request.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency that yields a database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
