# Database

The Feedback Management System uses **SQLite** by default (Phase 1
recommendation). A SQL schema script is included so the same model can
be migrated to PostgreSQL with minimal changes.

## Files

- `schema.sql` — Table definitions for both SQLite and PostgreSQL,
  plus a few rows of sample seed data.
- `feedback.db` — Auto-generated SQLite database file (created the
  first time the backend runs). Not tracked in git.

## Auto-creation

When the FastAPI backend starts (`backend/main.py`), SQLAlchemy
inspects the database and runs `Base.metadata.create_all(...)` which
creates the `feedback` table automatically if it doesn't exist. You
do **not** need to run `schema.sql` manually for normal use — the
script is provided for reference and for setting up PostgreSQL.

## Schema

| Column           | Type         | Notes                              |
| ---------------- | ------------ | ---------------------------------- |
| feedback_id      | INTEGER      | Primary key, auto-increment        |
| participant_name | VARCHAR(100) | Required                           |
| program_name     | VARCHAR(150) | Required                           |
| rating           | INTEGER      | Required, between 1 and 5          |
| comments         | TEXT         | Optional                           |
| submitted_at     | DATETIME     | Auto-set on insert, server-side    |

## Manual setup (optional)

```bash
# SQLite
sqlite3 feedback.db < schema.sql

# PostgreSQL — uncomment the PostgreSQL block in schema.sql first,
# and adjust SQLALCHEMY_DATABASE_URL in backend/database.py to point
# to your PostgreSQL server.
psql -U postgres -d fms -f schema.sql
```
