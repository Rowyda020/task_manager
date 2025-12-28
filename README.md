# Task Manager

A full-stack Task Management application built with Node.js, Express, React, and SQLite. It allows users to register, login, and manage tasks.

## Features
- User authentication (Register/Login)
- Create, read, update, delete tasks
- RESTful API
- Fully containerized with Docker

## Tech Stack
- Backend: Node.js, Express
- Frontend: React
- Database: SQLite (Better-SQLite3)
- Containerization: Docker & Docker Compose

## Getting Started

### Clone the repository
git clone https://github.com/Rowyda020/task_manager.git
cd task_manager

### Run with Docker
docker-compose up --build

Backend runs on: http://localhost:5000  
Frontend runs on: http://localhost:5173

### Run Locally

#### Backend
cd backend
npm install
npm start

#### Frontend
cd front-end
npm install
npm run dev


## Environment Variables
Create a `.env` file in the backend folder:
PORT=5000  
JWT_SECRET=your_secret_key
