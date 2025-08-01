# REST API

A simple REST API built with Node and Express.js, featuring endpoints for managing users, income, and expenses. The API is deployed at: https://rest-api-rndr.onrender.com/.

## Endpoints

- Home: `GET /`

- Users:  
  - `GET /users` - Retrieve all users. 
  - `POST /users` - Add a new user.
  - `PUT /users/:id` - Update an existing user by ID.
  - `DELETE /users/:id` - Delete a user by ID.

- Expenses:  
  - `GET /expenses` - Retrieve all expenses.  
  - `POST /expenses` - Add a new expense.  
  - `PUT /expenses/:id` - Update an existing expense by ID. 
  - `DELETE /expenses/:id` - Delete an expense by ID.

- Income:  
  - `GET /income` - Retrieve all income. 
  - `POST /income` - Add a new income.
  - `PUT /income/:id` - Update an existing income by ID.
  - `DELETE /income/:id` - Delete an income by ID.

## Features

- Back End: Node with Express.js
- Database: Firebase Realtime Database,
   
## Installation & Setup

### 1. Clone the Repository

To clone the repository from Github, use the following commands:
```bash
git clone https://github.com/amritasanjay875/REST-API-with-Node.js.git
cd REST-API-with-Node.js
```

### 2. Install Dependencies

To install node-modules required for running the application, use the following command:
```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and include the following:

```env
API_KEY=AIzaSyB--rYQ62STRiqw6ENMffbo8l0bNduR05I
AUTH_DOMAIN=rest-api-47e26.firebaseapp.com
DATABASE_URL=https://rest-api-47e26-default-rtdb.firebaseio.com
PROJECT_ID=rest-api-47e26
STORAGE_BUCKET=rest-api-47e26.firebasestorage.app
MESSAGING_SENDER_ID=55104848894
APP_ID=1:55104848894:web:4a94e68c51b03dd16836af
```

### 4. Install additional dependencies

The application uses the following packages:
  - Express.js - Web framework. 
  - dotenv - Loads environment variables.
  - firebase - Data stored in Firebase.

Install these packages manually if needed using the following command:
```bash
npm install express dotenv firebase
```

### 5. Launch the application

Start the server locally using the following command:
```bash
nodemon index.js
```

The server will run at: http://localhost:3000.

## Testing

The endpoints can be tested using tools like Postman.

## Firebase Integration Notes

The application uses the Firebase Modular SDK consistently across all modules. The Firebase configuration and services are imported using modular functions. By adopting the modular SDK throughout, the application maintains a clean and scalable architecture.

## Author

Amrita Sanjay
WIT Spring 2025 Cohort
