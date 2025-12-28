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

## Endpoints

POST /auth/register
Body: 
{
  "username": "your_username",
  "email": "your_email",
  "password": "your_password"
}


POST /auth/login
Body:
{
  "email": "your_email",
  "password": "your_password"
}


POST /tasks
Body:
{
  "title": "Task title",
  "description": "Task description"
}



GET /tasks

PUT /tasks/:id
Body:
{
  "title": "Updated title",
  "description": "Updated description"
}

DELETE /tasks/:id
<img width="1894" height="928" alt="Screenshot 2025-12-28 201059" src="https://github.com/user-attachments/assets/6bc41717-5f6f-44f2-83b4-6092c2d40a38" />
<img width="1887" height="1008" alt="Screenshot 2025-12-28 201302" src="https://github.com/user-attachments/assets/5d681119-4f1a-4cdb-a862-0cfb75856810" />
<img width="1877" height="930" alt="Screenshot 2025-12-28 201124" src="https://github.com/user-attachments/assets/721240ff-f248-4125-b94d-66a0616195f6" />

