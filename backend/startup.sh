#!/bin/sh
set -e
echo "Running migrations..."
python manage.py migrate --noinput
echo "Starting gunicorn..."
exec gunicorn --bind 0.0.0.0:8080 --workers 2 --timeout 60 espress_api.wsgi:application
