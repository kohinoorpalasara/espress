# Espress ✈ — Travel Community

A modern full-stack travel community platform where travelers discover cities, share experiences, and connect with fellow explorers worldwide.

> Originally a Django 1.5 college project, rebuilt with React 18 + Django REST Framework.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, React Router v6 |
| Backend | Django 4.2, Django REST Framework, SimpleJWT |
| Database | SQLite (dev) / PostgreSQL (production) |
| Static files | WhiteNoise |
| Deployment | Google Cloud Run + Cloud Build |

---

## Features

- **City Explorer** — Browse 8+ cities with continent filters and search
- **Travel Posts** — Write and read travel stories per city
- **Likes & Comments** — Engage with posts from the community
- **JWT Auth** — Register, login, and manage your profile
- **Seed Data** — Pre-loaded cities (Paris, Tokyo, NYC, Bali, Cape Town, Sydney, Rome, Bangkok) with sample posts

---

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data       # seeds cities, users, posts
python manage.py runserver       # http://localhost:8000
```

Default credentials after seeding:
- `admin` / `admin123` (superuser)
- `traveler` / `travel123` (regular user)

### Frontend

```bash
cd frontend
npm install
npm run dev                      # http://localhost:5173
```

---

## API Reference

Base URL: `http://localhost:8000/api/`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login → JWT tokens |
| GET | `/api/auth/me/` | Current user info |
| GET | `/api/cities/` | List all cities |
| GET | `/api/cities/?continent=EU` | Filter by continent |
| GET | `/api/cities/?search=paris` | Search cities |
| GET | `/api/posts/` | List all posts |
| GET | `/api/posts/?city=1` | Posts for a city |
| POST | `/api/posts/` | Create post (auth required) |
| POST | `/api/posts/{id}/like/` | Toggle like (auth required) |
| GET | `/api/posts/{id}/comments/` | Get comments |
| POST | `/api/posts/{id}/comments/` | Add comment (auth required) |
| GET | `/api/users/{id}/` | User profile |

---

## Deployment — Google Cloud Run

### Prerequisites

- Google Cloud project with billing enabled
- `gcloud` CLI authenticated
- Cloud Build API enabled

### Environment Variables (set in Cloud Run)

| Variable | Description | Example |
|----------|-------------|---------|
| `SECRET_KEY` | Django secret key | `your-secret-key-here` |
| `DEBUG` | Debug mode | `False` |
| `ALLOWED_HOSTS` | Comma-separated hosts | `*.run.app,yourdomain.com` |
| `DB_NAME` | PostgreSQL database name | `espress_db` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | — |
| `DB_HOST` | Database host | `127.0.0.1` (Cloud SQL proxy) |

### Option 1: Cloud Build CI/CD (Recommended)

Push to main to auto-deploy both services:

```bash
gcloud builds submit --config cloudbuild.yaml
```

Or connect via the Cloud Run Console → **Create Service** → **Continuously deploy from a source repository** → select this GitHub repo.

### Option 2: Manual Deploy

```bash
# Backend
cd backend
gcloud run deploy espress-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "SECRET_KEY=your-key,DEBUG=False"

# Frontend
cd frontend
gcloud run deploy espress-frontend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

### Cloud SQL (PostgreSQL)

To connect the backend to Cloud SQL:

1. Create a Cloud SQL PostgreSQL instance in your project
2. Add the instance connection name to Cloud Run:
   ```
   --add-cloudsql-instances PROJECT:REGION:INSTANCE
   --set-env-vars "DB_HOST=/cloudsql/PROJECT:REGION:INSTANCE"
   ```
3. Set `DB_NAME`, `DB_USER`, `DB_PASSWORD` as env vars or Secret Manager secrets

---

## Project Structure

```
espress/
├── backend/                  # Django REST API
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── manage.py
│   ├── espress_api/          # Project settings, URLs, WSGI
│   └── forum/                # App: models, serializers, views, URLs
│       └── management/commands/seed_data.py
├── frontend/                 # React + Vite app
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── src/
│   │   ├── api/client.js     # Axios with JWT interceptor
│   │   ├── context/AuthContext.jsx
│   │   ├── components/       # Navbar, CityCard, PostCard, etc.
│   │   └── pages/            # LandingPage, CityExplorer, PostDetail, etc.
├── cloudbuild.yaml           # Google Cloud Build CI/CD pipeline
└── README.md
```

---

## Original College Project

The original version (Django 1.5, HTML templates, MySQL, no password hashing) is preserved in the `espress/` and `forum/` directories at the repo root for reference.
