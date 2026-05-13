"""
Feedback router — implements the REST endpoints defined in Section 10
of the project specification.

Endpoints:
    GET    /feedback           Retrieve all feedback
    GET    /feedback/{id}      Retrieve feedback by ID
    POST   /feedback           Submit feedback
    PUT    /feedback/{id}      Update feedback
    DELETE /feedback/{id}      Delete feedback
    GET    /search             Search feedback
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter(prefix="/feedback", tags=["Feedback"])


@router.get("", response_model=List[schemas.FeedbackResponse])
def list_feedback(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
):
    """Retrieve all feedback entries (paginated, newest first)."""
    return crud.get_all_feedback(db, skip=skip, limit=limit)


@router.get("/statistics", response_model=dict)
def get_statistics(db: Session = Depends(get_db)):
    """Return aggregate stats used by the dashboard."""
    return crud.get_statistics(db)


@router.get("/{feedback_id}", response_model=schemas.FeedbackResponse)
def get_feedback_by_id(feedback_id: int, db: Session = Depends(get_db)):
    """Retrieve a single feedback entry by its ID."""
    db_feedback = crud.get_feedback(db, feedback_id)
    if db_feedback is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Feedback with id {feedback_id} not found",
        )
    return db_feedback


@router.post("", response_model=schemas.FeedbackResponse, status_code=status.HTTP_201_CREATED)
def create_feedback(feedback: schemas.FeedbackCreate, db: Session = Depends(get_db)):
    """Submit a new feedback entry."""
    return crud.create_feedback(db, feedback)


@router.put("/{feedback_id}", response_model=schemas.FeedbackResponse)
def update_feedback(
    feedback_id: int,
    feedback_update: schemas.FeedbackUpdate,
    db: Session = Depends(get_db),
):
    """Update an existing feedback entry."""
    updated = crud.update_feedback(db, feedback_id, feedback_update)
    if updated is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Feedback with id {feedback_id} not found",
        )
    return updated


@router.delete("/{feedback_id}", status_code=status.HTTP_200_OK)
def delete_feedback(feedback_id: int, db: Session = Depends(get_db)):
    """Delete a feedback entry."""
    deleted = crud.delete_feedback(db, feedback_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Feedback with id {feedback_id} not found",
        )
    return {"message": f"Feedback {feedback_id} deleted successfully"}


# A separate router for /search keeps the path clean and matches the
# spec's URL ("/search" rather than "/feedback/search").
search_router = APIRouter(tags=["Search"])


@search_router.get("/search", response_model=List[schemas.FeedbackResponse])
def search_feedback(
    keyword: Optional[str] = Query(None, description="Free-text search across name, program, comments"),
    rating: Optional[int] = Query(None, ge=1, le=5, description="Exact rating filter"),
    program: Optional[str] = Query(None, description="Filter by training/event/product name"),
    db: Session = Depends(get_db),
):
    """Search and filter feedback entries."""
    return crud.search_feedback(db, keyword=keyword, rating=rating, program=program)
