# Feedback Management System (FMS)

> **AFDE Capstone — Phase 1 Project**
> A centralized, full-stack Feedback Management System built with React, FastAPI, and SQLite. Includes a real-time dashboard that updates automatically as new feedback is submitted.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Overview](#project-overview)
3. [Features Implemented](#features-implemented)
4. [Technology Stack](#technology-stack)
5. [Project Structure](#project-structure)
6. [Setup Instructions](#setup-instructions)
7. [API Documentation](#api-documentation)
8. [Database Schema](#database-schema)
9. [Real-Time UI](#real-time-ui)
10. [Screenshots](#screenshots)
11. [Testing the API](#testing-the-api)
12. [Future Enhancements](#future-enhancements)

---

## Quick Start

> Prerequisites: **Python 3.10+** and **Node.js 18+** must be installed.

Open **two terminals** from the project root and run one command in each:

### Terminal 1 — Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

API is now live at: **http://localhost:8000**
Interactive docs (Swagger UI): **http://localhost:8000/docs**

### Terminal 2 — Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Web app opens automatically at: **http://localhost:3000**

> The SQLite database is created automatically at `database/feedback.db` on first run — no manual setup needed.

---

## Project Overview

Organizations regularly collect feedback from participants, employees, customers, and trainees to evaluate the quality of training programs, products, and services. Today, feedback is often scattered across Google Forms, Excel sheets, emails, and manual surveys — making it hard to track, search, or analyze.

The **Feedback Management System** centralizes feedback collection, storage, search, and management into a single web application. The system is designed to support future extensions such as analytics dashboards, sentiment analysis, AI-powered semantic search, and GenAI-based summarization.

### Business Problem Solved

- Feedback scattered across multiple platforms
- Difficulty identifying common issues
- Manual consolidation of responses
- No efficient search capability
- Limited historical analysis

### System Users

| User Type        | Responsibilities          |
| ---------------- | ------------------------- |
| Participant/User | Submit feedback           |
| Administrator    | Manage feedback records   |

---

## Features Implemented

- ✅ **Real-time Dashboard** — Live stats with auto-refresh (polling every 5 seconds), total feedback count, average rating, and rating distribution chart
- ✅ **Submit Feedback Form** — Participant name, training/event/product, 1–5 star rating, comments, with client-side validation
- ✅ **Feedback Listing Page** — Card-based grid view of all submitted feedback with live refresh
- ✅ **Feedback Detail Page** — Complete view of a single feedback entry
- ✅ **Edit Feedback** — Administrators can update any feedback record
- ✅ **Delete Feedback** — With confirmation prompt
- ✅ **Search & Filter** — Keyword search across name/program/comments, rating filter, program filter
- ✅ **REST API** — All required endpoints from the specification
- ✅ **CORS Enabled** — Frontend and backend can run on different ports
- ✅ **Responsive Design** — Works on desktop, tablet, and mobile
- ✅ **Form Validation** — Client-side and server-side (Pydantic)
- ✅ **Modular Architecture** — Layered backend (routers / CRUD / models / schemas) and component-based frontend

---

## Technology Stack

| Layer            | Technology                       |
| ---------------- | -------------------------------- |
| Frontend         | React 18 + Vite + React Router   |
| HTTP Client      | Axios                            |
| Backend          | Python FastAPI                   |
| ORM              | SQLAlchemy 2                     |
| Validation       | Pydantic 2                       |
| Database         | SQLite (PostgreSQL-ready)        |
| API Testing      | Postman / curl / built-in Swagger UI |
| Version Control  | Git / GitHub                     |

---

## Project Structure

```
AFDE_MAY6_SALMA_FMS/
│
├── backend/                  # FastAPI application
│   ├── main.py               # App entry point, CORS, router registration
│   ├── database.py           # SQLAlchemy engine + session
│   ├── models.py             # ORM model (Feedback table)
│   ├── schemas.py            # Pydantic request/response schemas
│   ├── crud.py               # All database operations
│   ├── routers/
│   │   ├── __init__.py
│   │   └── feedback.py       # /feedback and /search endpoints
│   ├── services/             # Reserved for future business logic
│   └── requirements.txt
│
├── frontend/                 # React application
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── main.jsx          # React entry point
│       ├── App.jsx           # Routes + nav layout
│       ├── api.js            # Axios instance
│       ├── styles.css        # Global styles
│       ├── components/
│       │   ├── RatingStars.jsx
│       │   ├── FeedbackCard.jsx
│       │   └── FeedbackForm.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── SubmitFeedback.jsx
│       │   ├── FeedbackList.jsx
│       │   ├── FeedbackDetail.jsx
│       │   └── EditFeedback.jsx
│       └── services/
│           └── feedbackService.js
│
├── database/
│   ├── feedback.db           # SQLite database (auto-created on first run)
│   ├── schema.sql            # SQLite + PostgreSQL schema scripts
│   └── README.md
│
├── docs/
│   └── API.md                # API documentation
│
├── screenshots/              # Place UI / Postman screenshots here
│
├── README.md
├── requirements.txt          # Top-level pointer to backend deps
└── .gitignore
```

---

## Setup Instructions

### Prerequisites

- **Python 3.10+** — for the FastAPI backend
- **Node.js 18+** and **npm** — for the React frontend
- (Optional) **Git** — for version control

Verify your versions:

```bash
python --version    # should be 3.10 or higher
node --version      # should be 18 or higher
npm --version
```

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/AFDE_MAY6_SALMA_FMS.git
cd AFDE_MAY6_SALMA_FMS
```

### 2. Backend Setup (FastAPI)

```bash
cd backend

# (Recommended) Create and activate a virtual environment
python -m venv venv

# Activate — Windows Command Prompt / PowerShell:
venv\Scripts\activate

# Activate — macOS / Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the development server
uvicorn main:app --reload
```

The API will be available at:

| URL | Description |
|-----|-------------|
| http://localhost:8000 | API base URL |
| http://localhost:8000/docs | Interactive Swagger UI |
| http://localhost:8000/redoc | ReDoc documentation |
| http://localhost:8000/openapi.json | OpenAPI schema (for Postman import) |

The SQLite database is created automatically at `database/feedback.db` on first run.

### 3. Frontend Setup (React)

Open a **new terminal** (keep the backend running):

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The web app opens automatically at **http://localhost:3000**.

> To build a production bundle instead: `npm run build`

### 4. Database Setup

No manual setup is required for SQLite — tables are created automatically when the backend first starts.

For PostgreSQL, see [database/README.md](database/README.md) and the PostgreSQL section in [database/schema.sql](database/schema.sql).

---

## API Documentation

### Base URL

```
http://localhost:8000
```

### Endpoints

| Method | Endpoint                  | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| GET    | `/`                       | Health check                       |
| GET    | `/feedback`               | List all feedback (newest first)   |
| GET    | `/feedback/{id}`          | Get a single feedback entry        |
| GET    | `/feedback/statistics`    | Aggregate dashboard stats          |
| POST   | `/feedback`               | Submit new feedback                |
| PUT    | `/feedback/{id}`          | Update an existing feedback entry  |
| DELETE | `/feedback/{id}`          | Delete a feedback entry            |
| GET    | `/search`                 | Search / filter feedback           |

### Example Requests

#### POST /feedback — Create new feedback

```bash
curl -X POST http://localhost:8000/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "participant_name": "Salma",
    "program_name": "AFDE Capstone Training",
    "rating": 5,
    "comments": "Excellent training program!"
  }'
```

**Response (201 Created):**

```json
{
  "feedback_id": 1,
  "participant_name": "Salma",
  "program_name": "AFDE Capstone Training",
  "rating": 5,
  "comments": "Excellent training program!",
  "submitted_at": "2026-05-13T10:30:45.123456"
}
```

#### GET /search — Filter feedback

```bash
# Search by keyword
curl "http://localhost:8000/search?keyword=excellent"

# Filter by rating
curl "http://localhost:8000/search?rating=5"

# Filter by program
curl "http://localhost:8000/search?program=AFDE"

# Combine filters
curl "http://localhost:8000/search?keyword=training&rating=5"
```

#### PUT /feedback/{id} — Partial update

```bash
curl -X PUT http://localhost:8000/feedback/1 \
  -H "Content-Type: application/json" \
  -d '{"rating": 4, "comments": "Updated comment"}'
```

#### DELETE /feedback/{id}

```bash
curl -X DELETE http://localhost:8000/feedback/1
```

For full details including all field validations and error responses, open the interactive Swagger UI at `http://localhost:8000/docs` while the backend is running, or see [docs/API.md](docs/API.md).

---

## Database Schema

**Feedback Table:**

| Column           | Type         | Constraints                         |
| ---------------- | ------------ | ----------------------------------- |
| feedback_id      | INTEGER      | PRIMARY KEY, AUTOINCREMENT          |
| participant_name | VARCHAR(100) | NOT NULL                            |
| program_name     | VARCHAR(150) | NOT NULL                            |
| rating           | INTEGER      | NOT NULL, CHECK (1–5)               |
| comments         | TEXT         | NULL allowed                        |
| submitted_at     | DATETIME     | NOT NULL, default CURRENT_TIMESTAMP |

See [database/schema.sql](database/schema.sql) for the executable schema script.

---

## Real-Time UI

The web interface is **real-time** — the Dashboard and All Feedback pages poll the backend every **5 seconds** and silently refresh the data when new feedback is submitted. A live indicator (pulsing green dot) shows when auto-refresh is active.

This means you can open the dashboard in one browser tab, submit feedback from another tab (or via Postman), and watch the stats and listing update automatically — no page reload needed.

> **Note:** Polling is paused on the All Feedback page when a search filter is active, so your filtered view isn't unexpectedly reset.

---

## Screenshots

Place your screenshots in the `screenshots/` folder. Recommended:

- `dashboard.png` — Dashboard with stats
- `submit.png` — Submit Feedback form
- `list.png` — All Feedback listing
- `detail.png` — Feedback detail page
- `search.png` — Search and filter results
- `postman.png` — Postman / Swagger API testing

---

## Testing the API

### Option 1: Swagger UI (easiest)

Open **http://localhost:8000/docs** while the backend is running. Every endpoint is listed with interactive "Try it out" buttons.

### Option 2: curl (Windows PowerShell)

```powershell
# Create feedback
Invoke-WebRequest -Uri "http://localhost:8000/feedback" -Method POST `
  -Body '{"participant_name":"Salma","program_name":"AFDE","rating":5,"comments":"Great!"}' `
  -ContentType "application/json" -UseBasicParsing | Select-Object -ExpandProperty Content

# List all feedback
Invoke-WebRequest -Uri "http://localhost:8000/feedback" -UseBasicParsing | Select-Object -ExpandProperty Content

# Search
Invoke-WebRequest -Uri "http://localhost:8000/search?keyword=Great&rating=5" -UseBasicParsing | Select-Object -ExpandProperty Content

# Statistics
Invoke-WebRequest -Uri "http://localhost:8000/feedback/statistics" -UseBasicParsing | Select-Object -ExpandProperty Content
```

### Option 2: curl (macOS / Linux / Git Bash)

```bash
# Create feedback
curl -X POST http://localhost:8000/feedback \
  -H "Content-Type: application/json" \
  -d '{"participant_name":"Salma","program_name":"AFDE","rating":5,"comments":"Great!"}'

# List all feedback
curl http://localhost:8000/feedback

# Search
curl "http://localhost:8000/search?keyword=Great&rating=5"

# Statistics
curl http://localhost:8000/feedback/statistics
```

### Option 3: Postman

Import the OpenAPI schema from `http://localhost:8000/openapi.json` into Postman to get all endpoints pre-configured with example payloads.

---

## Future Enhancements

Phase 1 explicitly excludes the following, all of which can be added on top of the current architecture:

- Authentication & authorization (JWT, OAuth)
- Sentiment analysis on free-text comments
- Analytics dashboards with charts and time-series
- AI-powered semantic search
- GenAI-based summarization
- Cloud deployment (Docker, AWS / Azure / GCP)
- Email notifications on new feedback
- Bulk export (CSV / Excel / PDF)

---

## Author

**Salma**
AFDE Capstone — Phase 1
Project Code: **FMS** · Batch: **AFDE**

---

## License

This project is created for educational purposes as part of the AFDE Capstone Phase 1 assignment.
