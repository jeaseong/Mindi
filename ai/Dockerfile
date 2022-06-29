FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN apt-get update -y
RUN apt-get install -y gcc g++
RUN python3 -m pip install --upgrade pip
RUN pip3 install -r requirements.txt
RUN apt-get install -y default-jdk
COPY . .
EXPOSE 8000
CMD ["python3", "app.py"]