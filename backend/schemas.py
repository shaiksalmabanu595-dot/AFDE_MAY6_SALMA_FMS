"""
Pydantic schemas for request validation and response serialization.

These schemas define the shape of data that flows in and out of the API
and provide automatic validation of incoming payloads.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class FeedbackBase(BaseModel):
    """Common fields shared by create and update payloads."""

    participant_name: str = Field(..., min_length=1, max_length=100)
    program_name: str = Field(..., min_length=1, max_length=150)
    rating: int = Field(..., ge=1, le=5, description="Rating between 1 (Poor) and 5 (Excellent)")
    comments: Optional[str] = Field(None, max_length=2000)


class FeedbackCreate(FeedbackBase):
    """Payload for POST /feedback."""


class FeedbackUpdate(BaseModel):
    """Payload for PUT /feedback/{id}. All fields optional for partial updates."""

    participant_name: Optional[str] = Field(None, min_length=1, max_length=100)
    program_name: Optional[str] = Field(None, min_length=1, max_length=150)
    rating: Optional[int] = Field(None, ge=1, le=5)
    comments: Optional[str] = Field(None, max_length=2000)


class FeedbackResponse(FeedbackBase):
    """Response model returned to the client."""

    feedback_id: int
    submitted_at: datetime

    class Config:
        from_attributes = True  # Pydantic v2 equivalent of orm_mode = True
