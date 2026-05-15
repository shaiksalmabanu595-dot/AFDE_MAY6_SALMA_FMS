"""
Database configuration module.

Sets up the SQLAlchemy engine, session factory, and declarative base
for the Feedback Management System. SQLite is used for Phase 1 as
recommended by the project specification.
"""

from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Resolve the database path relative to this file so the server can be
# started from any working directory (e.g. project root or backend/).
_DB_PATH = Path(__file__).parent.parent / "database" / "feedback.db"
SQLALCHEMY_DATABASE_URL = f"sqlite:///{_DB_PATH}"

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
