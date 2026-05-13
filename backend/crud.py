"""
CRUD operations for the Feedback Management System.

Each function encapsulates a single database interaction so that the
routers stay thin and the business logic remains testable.
"""

from typing import List, Optional

from sqlalchemy import or_
from sqlalchemy.orm import Session

import models
import schemas


def get_feedback(db: Session, feedback_id: int) -> Optional[models.Feedback]:
    """Return a single feedback entry by its primary key, or None."""
    return db.query(models.Feedback).filter(models.Feedback.feedback_id == feedback_id).first()


def get_all_feedback(db: Session, skip: int = 0, limit: int = 100) -> List[models.Feedback]:
    """Return a page of feedback entries, newest first."""
    return (
        db.query(models.Feedback)
        .order_by(models.Feedback.submitted_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_feedback(db: Session, feedback: schemas.FeedbackCreate) -> models.Feedback:
    """Insert a new feedback entry and return the persisted row."""
    db_feedback = models.Feedback(
        participant_name=feedback.participant_name.strip(),
        program_name=feedback.program_name.strip(),
        rating=feedback.rating,
        comments=(feedback.comments or "").strip() or None,
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback


def update_feedback(
    db: Session, feedback_id: int, feedback_update: schemas.FeedbackUpdate
) -> Optional[models.Feedback]:
    """Apply a partial update to an existing feedback entry."""
    db_feedback = get_feedback(db, feedback_id)
    if db_feedback is None:
        return None

    update_data = feedback_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        if isinstance(value, str):
            value = value.strip()
        setattr(db_feedback, field, value)

    db.commit()
    db.refresh(db_feedback)
    return db_feedback


def delete_feedback(db: Session, feedback_id: int) -> bool:
    """Delete a feedback entry. Returns True if a row was removed."""
    db_feedback = get_feedback(db, feedback_id)
    if db_feedback is None:
        return False
    db.delete(db_feedback)
    db.commit()
    return True


def search_feedback(
    db: Session,
    keyword: Optional[str] = None,
    rating: Optional[int] = None,
    program: Optional[str] = None,
) -> List[models.Feedback]:
    """
    Search and filter feedback entries.

    Filters are combined with AND. Within the keyword filter, the term
    is matched (case-insensitive) against participant_name, program_name,
    and comments.
    """
    query = db.query(models.Feedback)

    if keyword:
        like_pattern = f"%{keyword}%"
        query = query.filter(
            or_(
                models.Feedback.participant_name.ilike(like_pattern),
                models.Feedback.program_name.ilike(like_pattern),
                models.Feedback.comments.ilike(like_pattern),
            )
        )

    if rating is not None:
        query = query.filter(models.Feedback.rating == rating)

    if program:
        query = query.filter(models.Feedback.program_name.ilike(f"%{program}%"))

    return query.order_by(models.Feedback.submitted_at.desc()).all()


def get_statistics(db: Session) -> dict:
    """Aggregate statistics for the dashboard page."""
    all_feedback = db.query(models.Feedback).all()
    total_count = len(all_feedback)
    if total_count == 0:
        return {"total_feedback": 0, "average_rating": 0.0, "rating_distribution": {}}

    average_rating = sum(f.rating for f in all_feedback) / total_count
    distribution = {str(i): 0 for i in range(1, 6)}
    for f in all_feedback:
        distribution[str(f.rating)] += 1

    return {
        "total_feedback": total_count,
        "average_rating": round(average_rating, 2),
        "rating_distribution": distribution,
    }
