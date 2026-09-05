#!/bin/sh
set -e
echo "Running migrations..."
python manage.py migrate --noinput

# Cloud Run's SQLite disk is ephemeral, so reseed on cold start.
# seed_data is idempotent (get_or_create), so this is safe on Postgres too.
if [ "$SEED_ON_START" = "true" ]; then
  echo "Seeding data..."
  python manage.py seed_data || echo "Seeding skipped/failed, continuing."
fi

echo "Starting gunicorn..."
exec gunicorn --bind 0.0.0.0:8080 --workers 2 --timeout 60 espress_api.wsgi:application
