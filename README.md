# ascendify-assignment
A comprehensive RESTful API built with MongoDB, Express.js, React, and Node.js (MERN) to manage user authentication and tasks. 
This project demonstrates CRUD operations, JWT-based authentication, and pagination, making it an excellent starting point for building modern applications.

## Features

- **User Authentication**: Secure user registration and login.
- **JWT Authorization**: Protect routes and ensure secure access.
- **Task Management**:
  - Create, read, update, and delete tasks.
  - Pagination support for task listing.
- **RESTful API Design**: Follows standard HTTP methods and status codes.
- **MongoDB Integration**: Uses Mongoose for schema modeling and database operations.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

Create a `.env` file in the project root with the following variables:

- PORT=5000 
- MONGO_URI=<Your MongoDB Connection String> 
- JWT_SECRET=<Your JWT Secret>


### Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/AbdulWahabCH/ascendify-assignment
    cd ascendify-assignment
    npm install
    npm start/local

# Base URL 
    http://localhost:5000

### Auth Route
Register a user
POST /api/auth/register

Request 
```
{
  "name": "user01",
  "email": "user01@example.com",
  "password": "user01"
}
```
Response
```
{
  "_id": "id of the document",
  "name": "user01",
  "email": "user01@example.com",
  "token": "<------------ token ---------->"
}

```

Login a User
POST /api/auth/login
Request
```
{
  "email": "user01@example.com",
  "password": "user01"
}

```
Response
```
{
  "_id": "64a2c0a4b6c1f928d3c8b5e4",
  "name": "User01",
  "email": "user01@example.com",
  "token": "<---------- Token ----------->"
}

```

### Tasks Route

GET /api/tasks
```
{
  "total": 12,
  "page": 1,
  "limit": 4,
  "totalPages": 3,
  "tasks": [
    {
      "_id": "some id",
      "title": "task name",
      "description": "Description of Task",
      "completed": false,
      "createdAt": "Date",
      "user": "user id"
    }
  ]
}

```

GET /api/tasks/:id

```
{
  "_id": "id of the document",
  "title": "Task",
  "description": "Task 1",
  "completed": false,
  "createdAt": "Date of the created document",
  "user": "user id"
}

```

POST /api/tasks

Request
```
{
  "title": "New Task",
  "description": "Description of the new task",
  "completed": false
}
```
Response
```
{
  "_id": "id of the document",
  "title": "Task name",
  "description": "task",
  "completed": false,
  "createdAt": "Date",
  "user": "user id"
}

```

PUT /api/tasks/:id

Request
```
{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true
}

```
Response

```
{
  "_id": "ID OF THE docs",
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true,
  "createdAt": "date",
  "user": "user id"
}

```

DELETE /api/tasks/:id

Request
```
{
  "message": "Task deleted successfully."
}

```