# Feedback Management System (FMS)

> **AFDE Capstone — Phase 1 Project**
> A centralized, full-stack Feedback Management System built with React, FastAPI, and SQLite. Includes a real-time dashboard that updates automatically as new feedback is submitted.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features Implemented](#features-implemented)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Setup Instructions](#setup-instructions)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Real-Time UI](#real-time-ui)
9. [Screenshots](#screenshots)
10. [Testing the API](#testing-the-api)
11. [Future Enhancements](#future-enhancements)

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
AFDE_Salma_FMS/
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

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/AFDE_Salma_FMS.git
cd AFDE_Salma_FMS
```

### 2. Backend Setup (FastAPI)

```bash
cd backend

# Create and activate a virtual environment (recommended)
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

The API will be available at:

- **API base:** http://localhost:8000
- **Interactive docs (Swagger UI):** http://localhost:8000/docs
- **Alternative docs (ReDoc):** http://localhost:8000/redoc

The SQLite database file will be created automatically at
`database/feedback.db` on first run.

### 3. Frontend Setup (React)

Open a **new terminal** (keep the backend running):

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The web app will open automatically at **http://localhost:3000**.

### 4. Database Setup

No manual setup is required for SQLite — the tables are auto-created.
For PostgreSQL, see [database/README.md](database/README.md) and the
PostgreSQL block in [database/schema.sql](database/schema.sql).

---

## API Documentation

### Base URL

```
http://localhost:8000
```

### Endpoints

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| GET    | `/`                 | Health check             |
| GET    | `/feedback`         | List all feedback        |
| GET    | `/feedback/{id}`    | Get a single feedback    |
| POST   | `/feedback`         | Create new feedback      |
| PUT    | `/feedback/{id}`    | Update feedback          |
| DELETE | `/feedback/{id}`    | Delete feedback          |
| GET    | `/search`           | Search / filter feedback |
| GET    | `/feedback/statistics` | Aggregate dashboard stats |

### Example Requests & Responses

#### POST /feedback

```http
POST /feedback HTTP/1.1
Content-Type: application/json

{
  "participant_name": "Salma",
  "program_name": "AFDE Capstone Training",
  "rating": 5,
  "comments": "Excellent training program!"
}
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

#### GET /search

```
GET /search?keyword=excellent&rating=5
GET /search?program=AFDE
```

#### PUT /feedback/{id}

```http
PUT /feedback/1 HTTP/1.1
Content-Type: application/json

{
  "rating": 4,
  "comments": "Updated comment"
}
```

For full details with all field validations and error responses, see
[docs/API.md](docs/API.md) or open the interactive Swagger UI at
`http://localhost:8000/docs` while the backend is running.

---

## Database Schema

**Feedback Table:**

| Column           | Type         | Constraints                       |
| ---------------- | ------------ | --------------------------------- |
| feedback_id      | INTEGER      | PRIMARY KEY, AUTOINCREMENT        |
| participant_name | VARCHAR(100) | NOT NULL                          |
| program_name     | VARCHAR(150) | NOT NULL                          |
| rating           | INTEGER      | NOT NULL, CHECK (1–5)             |
| comments         | TEXT         | NULL allowed                      |
| submitted_at     | DATETIME     | NOT NULL, default CURRENT_TIMESTAMP |

See [database/schema.sql](database/schema.sql) for the executable script.

---

## Real-Time UI

The web interface is **real-time** — the Dashboard and All Feedback
pages poll the backend every **5 seconds** and silently refresh the
data when new feedback is submitted. A live indicator (pulsing green
dot) shows when auto-refresh is active.

This means you can open the dashboard in one browser tab, submit
feedback from another tab (or via Postman), and watch the stats and
listing update automatically — no page reload needed.

> **Note:** Polling is paused on the All Feedback page when a search
> filter is active, so your filtered view isn't unexpectedly reset.

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

Open http://localhost:8000/docs while the backend is running.

### Option 2: curl

```bash
# Create
curl -X POST http://localhost:8000/feedback \
  -H "Content-Type: application/json" \
  -d '{"participant_name":"Salma","program_name":"AFDE","rating":5,"comments":"Great!"}'

# List
curl http://localhost:8000/feedback

# Search
curl "http://localhost:8000/search?keyword=Great&rating=5"

# Stats
curl http://localhost:8000/feedback/statistics
```

### Option 3: Postman

Import the OpenAPI schema from `http://localhost:8000/openapi.json`
into Postman to get all endpoints pre-configured.

---

## Future Enhancements

Phase 1 explicitly excludes the following, all of which can be added
on top of the current architecture:

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
