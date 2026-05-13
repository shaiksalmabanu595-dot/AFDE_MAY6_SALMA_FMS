-- =====================================================
-- Feedback Management System - Database Schema
-- =====================================================
-- This script creates the schema for the Feedback table.
-- It works on SQLite directly and is easily portable to PostgreSQL.
-- For PostgreSQL, swap INTEGER PRIMARY KEY AUTOINCREMENT with
-- SERIAL PRIMARY KEY (see the PostgreSQL section below).
-- =====================================================

-- ---------- SQLite ----------
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_name VARCHAR(100) NOT NULL,
    program_name     VARCHAR(150) NOT NULL,
    rating           INTEGER      NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comments         TEXT,
    submitted_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_feedback_participant ON feedback(participant_name);
CREATE INDEX IF NOT EXISTS idx_feedback_program     ON feedback(program_name);
CREATE INDEX IF NOT EXISTS idx_feedback_rating      ON feedback(rating);

-- ---------- PostgreSQL equivalent ----------
-- CREATE TABLE IF NOT EXISTS feedback (
--     feedback_id      SERIAL       PRIMARY KEY,
--     participant_name VARCHAR(100) NOT NULL,
--     program_name     VARCHAR(150) NOT NULL,
--     rating           INTEGER      NOT NULL CHECK (rating BETWEEN 1 AND 5),
--     comments         TEXT,
--     submitted_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

-- ---------- Sample seed data ----------
INSERT INTO feedback (participant_name, program_name, rating, comments) VALUES
    ('Salma',   'AFDE Capstone Training', 5, 'Excellent program, very well-structured content.'),
    ('Rahul',   'Python for Data Engineering', 4, 'Good content, would love more hands-on exercises.'),
    ('Ananya',  'FastAPI Bootcamp', 5, 'Loved the practical approach!'),
    ('Karthik', 'React Fundamentals', 3, 'Good, but pace was a bit fast for beginners.');
