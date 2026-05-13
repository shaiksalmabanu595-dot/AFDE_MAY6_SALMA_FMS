# API Documentation — Feedback Management System

**Base URL:** `http://localhost:8000`
**Interactive Swagger UI:** `http://localhost:8000/docs`
**OpenAPI schema:** `http://localhost:8000/openapi.json`

All endpoints return JSON. All requests with a body must use
`Content-Type: application/json`.

---

## Endpoint Summary

| Method | Endpoint               | Description                       |
| ------ | ---------------------- | --------------------------------- |
| GET    | `/`                    | Health check                      |
| GET    | `/feedback`            | List all feedback (newest first)  |
| GET    | `/feedback/statistics` | Aggregate dashboard stats         |
| GET    | `/feedback/{id}`       | Retrieve feedback by ID           |
| POST   | `/feedback`            | Submit new feedback               |
| PUT    | `/feedback/{id}`       | Update an existing feedback entry |
| DELETE | `/feedback/{id}`       | Delete a feedback entry           |
| GET    | `/search`              | Search & filter feedback          |

---

## GET /

Health check.

**Response 200:**

```json
{
  "message": "Feedback Management System API",
  "version": "1.0.0",
  "docs": "/docs"
}
```

---

## GET /feedback

Retrieve all feedback entries, ordered newest first.

**Query parameters:**

| Name  | Type | Default | Description                       |
| ----- | ---- | ------- | --------------------------------- |
| skip  | int  | 0       | Pagination offset (≥ 0)           |
| limit | int  | 100     | Max items to return (1–500)       |

**Response 200:**

```json
[
  {
    "feedback_id": 1,
    "participant_name": "Salma",
    "program_name": "AFDE Capstone Training",
    "rating": 5,
    "comments": "Excellent training!",
    "submitted_at": "2026-05-13T10:30:45.123456"
  }
]
```

---

## GET /feedback/statistics

Aggregate stats used by the dashboard.

**Response 200:**

```json
{
  "total_feedback": 12,
  "average_rating": 4.25,
  "rating_distribution": {
    "1": 0,
    "2": 1,
    "3": 2,
    "4": 4,
    "5": 5
  }
}
```

---

## GET /feedback/{id}

Retrieve a single feedback by primary key.

**Path parameters:**

- `id` (int) — feedback_id

**Response 200:** Same shape as a single item from `GET /feedback`.

**Response 404:**

```json
{ "detail": "Feedback with id 999 not found" }
```

---

## POST /feedback

Submit a new feedback entry.

**Request body:**

```json
{
  "participant_name": "Salma",
  "program_name": "AFDE Capstone Training",
  "rating": 5,
  "comments": "Excellent program!"
}
```

**Field validation:**

| Field            | Required | Constraints              |
| ---------------- | -------- | ------------------------ |
| participant_name | yes      | 1–100 characters         |
| program_name     | yes      | 1–150 characters         |
| rating           | yes      | integer 1–5              |
| comments         | no       | up to 2000 characters    |

**Response 201:** The created feedback object, with `feedback_id` and `submitted_at`.

**Response 422:** Validation errors (FastAPI/Pydantic shape).

---

## PUT /feedback/{id}

Update an existing feedback entry. Supports partial updates — send only the fields you want to change.

**Request body (any subset):**

```json
{
  "rating": 4,
  "comments": "Updated comment"
}
```

**Response 200:** The updated feedback object.
**Response 404:** Not found.
**Response 422:** Validation error.

---

## DELETE /feedback/{id}

Delete a feedback entry.

**Response 200:**

```json
{ "message": "Feedback 1 deleted successfully" }
```

**Response 404:** Not found.

---

## GET /search

Search and filter feedback entries. All parameters are optional; filters combine with AND.

**Query parameters:**

| Name    | Type   | Description                                                  |
| ------- | ------ | ------------------------------------------------------------ |
| keyword | string | Case-insensitive match across participant_name, program_name, and comments |
| rating  | int    | Exact rating filter (1–5)                                    |
| program | string | Case-insensitive partial match on program_name               |

**Examples:**

```
GET /search?keyword=excellent
GET /search?rating=5
GET /search?program=AFDE&rating=5
GET /search?keyword=python&rating=4
```

**Response 200:** Array of feedback objects (may be empty).

---

## Error Format

All 4xx errors use FastAPI's standard error envelope:

```json
{ "detail": "Human-readable error message" }
```

Validation errors (422) include the offending field paths:

```json
{
  "detail": [
    {
      "loc": ["body", "rating"],
      "msg": "Input should be less than or equal to 5",
      "type": "less_than_equal"
    }
  ]
}
```
