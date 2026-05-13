"""
Feedback Management System — FastAPI application entry point.

Bootstraps the FastAPI app, configures CORS for the React frontend,
creates the database tables on startup, and mounts the feedback and
search routers.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine
from routers.feedback import router as feedback_router
from routers.feedback import search_router

# Create database tables on application startup if they don't exist.
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Feedback Management System API",
    description=(
        "A centralized Feedback Management System for collecting, viewing, "
        "searching, and managing feedback from participants, employees, and "
        "customers. Phase 1 capstone project."
    ),
    version="1.0.0",
)

# CORS — the React dev server typically runs on :3000 or :5173.
# We allow both, plus a wildcard fallback for local development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Health"])
def root():
    """Health-check endpoint."""
    return {
        "message": "Feedback Management System API",
        "version": "1.0.0",
        "docs": "/docs",
    }


# Register routers.
app.include_router(feedback_router)
app.include_router(search_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
