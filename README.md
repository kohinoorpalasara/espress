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
| `DB_NAME` | Postgres database name. **If unset, falls back to SQLite.** | `espress` |
| `DB_USER` | Database user | `espress` |
| `DB_PASSWORD` | Database password | — |
| `INSTANCE_CONNECTION_NAME` | Cloud SQL instance; resolves to the `/cloudsql` socket | `proj:region:instance` |
| `DB_HOST` | Host override, used only when `INSTANCE_CONNECTION_NAME` is unset | `127.0.0.1` |
| `SEED_ON_START` | Seed cities/posts on container start (idempotent) | `true` |

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
  --region australia-southeast1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "SECRET_KEY=your-key,DEBUG=False"

# Frontend
cd frontend
gcloud run deploy espress-frontend \
  --source . \
  --region australia-southeast1 \
  --allow-unauthenticated \
  --port 8080
```

### Cloud SQL (PostgreSQL)

Without `DB_NAME` the app runs on SQLite. Cloud Run's disk is ephemeral, so
SQLite data is wiped on every cold start — use Cloud SQL for real persistence.

**1. Enable the APIs**

```bash
gcloud services enable sqladmin.googleapis.com secretmanager.googleapis.com
```

**2. Create the instance, database, and user**

```bash
gcloud sql instances create espress-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=australia-southeast1

gcloud sql databases create espress --instance=espress-db

gcloud sql users create espress \
  --instance=espress-db \
  --password='<choose-a-strong-password>'
```

**3. Store the secrets**

```bash
python -c "import secrets; print(secrets.token_urlsafe(50))" \
  | tr -d '\n' | gcloud secrets create django-secret-key --data-file=-

printf '<the-same-db-password>' \
  | gcloud secrets create espress-db-password --data-file=-
```

Grant the runtime service account access to both:

```bash
PROJECT_NUMBER=$(gcloud projects describe "$(gcloud config get-value project)" \
  --format='value(projectNumber)')
SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

for s in django-secret-key espress-db-password; do
  gcloud secrets add-iam-policy-binding "$s" \
    --member="serviceAccount:${SA}" \
    --role=roles/secretmanager.secretAccessor
done
```

**4. Point the service at it**

```bash
INSTANCE="$(gcloud config get-value project):australia-southeast1:espress-db"

gcloud run services update espress \
  --region=australia-southeast1 \
  --add-cloudsql-instances="$INSTANCE" \
  --set-env-vars="DEBUG=False,ALLOWED_HOSTS=*,SEED_ON_START=true" \
  --set-env-vars="DB_NAME=espress,DB_USER=espress,INSTANCE_CONNECTION_NAME=$INSTANCE" \
  --set-secrets="SECRET_KEY=django-secret-key:latest,DB_PASSWORD=espress-db-password:latest"
```

`startup.sh` runs `migrate` on every start, so the schema is created on the
first deploy against the new database. Once real data exists, drop
`SEED_ON_START` so the sample content stops being re-inserted.

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
