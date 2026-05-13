"""
SQLAlchemy ORM models for the Feedback Management System.

The Feedback model maps to the `feedback` table defined in the project
specification (Section 12 — Database Schema).
"""

from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from database import Base


class Feedback(Base):
    """Represents a single feedback entry submitted by a participant."""

    __tablename__ = "feedback"

    feedback_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    participant_name = Column(String(100), nullable=False, index=True)
    program_name = Column(String(150), nullable=False, index=True)
    rating = Column(Integer, nullable=False)
    comments = Column(Text, nullable=True)
    submitted_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self) -> str:
        return (
            f"<Feedback id={self.feedback_id} "
            f"participant={self.participant_name!r} "
            f"rating={self.rating}>"
        )
