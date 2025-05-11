# 📦 TreasureBox

> *Host your personal Netflix-like media server right in your local network.*

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tech Stack](https://img.shields.io/badge/tech-Java%20%7C%20SpringBoot%20%7C%20React%20%7C%20Docker%20%7C%20PostgreSQL-blue)

## 🌟 Highlights

- Self-hosted Netflix-style media library
- Stream and organize your media locally
- Backend powered by Spring Boot
- Frontend built with React
- PostgreSQL for data storage
- Fully containerized with Docker

## ℹ️ Overview

**TreasureBox** is a media streaming app that lets you host and manage your own video library from the comfort of your home network. Think of it as a lightweight, local Netflix for your personal collection — no internet needed, and full control is in your hands.

## 🛠️ Tech Stack

- **Backend**: Java, Spring Boot, Maven  
- **Frontend**: React  
- **Database**: PostgreSQL  
- **Containerization**: Docker 

## 🚀 Usage

### 1. Clone the Repository

```bash
git clone https://github.com/WojciechMierzwa/TreasureBox.git
cd TreasureBox
```

### 2. Start the Database

Go to catalog db

```bash
cd db
```

Create .env
```bash
POSTGRES_USER=tb_user
POSTGRES_PASSWORD=treasure_box_pass
POSTGRES_DB=treasure_box
```

```bash
#in catalog db
docker-compose up -d
```

You can access the database manually with:

```bash
psql -h localhost -p 5432 -U tb_user -d treasure_box
```

### 3. Start the Backend

Go to catalog backend

```bash
cd backend
```

Create .env

```bash
# PostgreSQL Database Environment Variables
DB_HOST=host.docker.internal  # Use this for Docker to access localhost
DB_PORT=6543
DB_NAME=treasure_box
DB_USER=tb_user
DB_PASSWORD=treasure_box_pass

# Spring Boot application environment variables
SPRING_PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:3000 #No used
```

```bash
docker build -t backend .

# Or use Docker Compose
docker-compose build
docker-compose up
```

### 4. Start the Frontend

Go to catalog frontend

```bash
cd frontend
```

Create .env

```bash
REACT_APP_BACKEND_ADDRESS=http://localhost:8080
```

```bash
docker build -t frontend .

# Or use Docker Compose
docker-compose build
docker-compose up
```

## ⬇️ Installation

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Then run:

```bash
docker-compose up --build
```

## ✍️ Authors

Developed by [Wojciech Mierzwa](https://github.com/WojciechMierzwa)

---
