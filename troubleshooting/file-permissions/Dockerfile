FROM docker.io/library/python:3.13-alpine

# Create a non-root user and group to run the app
RUN addgroup -S apps && \
    adduser -S filebox -G apps

# Create a directory for file uploads
RUN mkdir -p /app/uploads

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py /app/app.py
COPY templates/upload_form.html /app/templates/upload_form.html
COPY templates/upload_success.html /app/templates/upload_success.html

# Change the user the container runs as
USER filebox

CMD ["python", "/app/app.py"]
