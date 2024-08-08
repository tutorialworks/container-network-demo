FROM docker.io/library/postgres:16.4

# Note that we're 'hard-coding' the username, password,
# and database name here.
# This is just to make it easier to run the example.

# In a real application, you should use environment variables
# to set these values, using docker run's `-e` flag.

ENV POSTGRES_USER=addressapp
ENV POSTGRES_PASSWORD=password123
ENV POSTGRES_DB=addressapp

COPY init.sql /docker-entrypoint-initdb.d/
