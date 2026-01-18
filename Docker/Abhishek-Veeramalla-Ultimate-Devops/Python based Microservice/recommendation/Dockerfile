FROM python:3.12-slim-bookworm as builder
WORKDIR /usr/app/src
COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . . 
ENTRYPOINT ["python3","recommendation_server.py"]