FROM python:3.9-slim

# setting safe defaults
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

# creating a dedicated execution space
WORKDIR /exec

# installing system tools (only essentials)
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc python3-dev && \
    rm -rf /var/lib/apt/lists/*

# adding a non-root user
RUN useradd -m executor && \
    chown -R executor:executor /exec
USER executor

# default command (idle container)
CMD ["tail", "-f", "/dev/null"]