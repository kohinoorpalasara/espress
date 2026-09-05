FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# collectstatic needs a dummy SECRET_KEY at build time (not the real one)
RUN SECRET_KEY=build-time-placeholder python manage.py collectstatic --noinput

EXPOSE 8080

CMD ["/app/startup.sh"]
