##TODO App

This is a full-stack Todo application built with React (frontend) and Node.js (backend), using TypeScript for both. The database is PostgreSQL, and migrations are managed via SQL queries.

##Getting Started

Prerequisites

Ensure you have the following installed:

Node.js (LTS version recommended)

PostgreSQL (Ensure the user has full privileges)

npm or yarn

Backend Setup

1. Clone the Repository

# Clone the forked repository
git clone  https://github.com/LufeMC/lumaa-spring-2025-swe.git
cd lumaa-spring-2025-swe
cd todo_v3

2. ##Set Up Environment Variables

##Create a .env file in the server directory and add the following:

DATABASE_URL=postgresql://admin:Derby+254s1@localhost:5432/todo_app
DATABASE_USER=admin
DATABASE_PASSWORD=Derby+254s1
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=todo_app

JWT_SECRET=ab409ee8261166ee41b8d1ca0adb3b01e1984db1242df80135b0ed8d56fa033a432f6ed8c4e8bd624d68c700ff6a37639b0691c01b481224253187dd5c41f2e8

3. Install Dependencies

cd server
npm install

4. ##Set Up the Database

Run the following SQL queries in PostgreSQL before starting the server:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

5. Run the Backend

npm run dev

This will start the backend server in development mode.

Frontend Setup

1. Install Dependencies

cd client
npm install

2. Start the Frontend

npm start
Testing

Running Tests

To run tests, execute:

npm test

Postman API Tests

You can use Postman to test the following endpoints:

Login

POST http://localhost:5000/api/auth/login

{
  "email": "testuser2@example.com",
  "password": "Password123"
}

Register

POST http://localhost:5000/api/auth/register

{
  "email": "testuser2@example.com",
  "password": "Password123"
}

With all tasks, the routes are JWT protected, bearer token has to be passed in the headers

Create a Task

POST http://localhost:5000/api/tasks
Headers:
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
Body:
{
  "description": "Build a Todo App Test2 for user1"
}

This will launch the React application.

Testing

Running Tests

To run tests, execute:

npm test

Salary Expectations

Expected Salary: $4,600 per month

Notes

Ensure PostgreSQL is running before starting the backend.

The user for PostgreSQL must have full privileges.

Modify the .env file as needed based on your local database credentials.

If you face permission issues, run:

sudo -u postgres psql
ALTER USER admin WITH SUPERUSER;

Deployment

To deploy the application, consider using:

Frontend: Vercel/Netlify

Backend: Render/Heroku

Database: Supabase/Cloud PostgreSQL providers

Video Demo

Watch the Demo
https://www.webmobilefirst.com/en/screencasts/-r243d6m7bpdge/



