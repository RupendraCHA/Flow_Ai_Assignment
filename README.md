# Personal Expense Tracker Backend RESTful API Project

## Overview
This project provides a RESTful API for managing personal financial records. Users can record their income and expenses, retrieve past transactions, and get summaries for totalIncome and totalExpenses, filtered by type. The API is built using Node.js and Express.js, with MongoDB as the database solution.


## Features of the project:
- Can be Registered as New User.
- Logining as a User.
- Adds a new transaction.
- Retrieves all transactions for the authenticated user
- Retrieves a transaction by ID.
- Update a transaction by ID.
- deletes a transaction by ID.
- Generate summaries for totalIncome and totalExpenses, filtered by type.

## Tools and Technologies

- **Backend**: Node.js with Express.js
- **Database**: MongoDB (NoSQL)
- **ODM (Object-Document Mapping)**: Mongoose

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/RupendraCHA/Flow_Ai_Assignment.git
2. **Navigate to the project directory:**
   ```bash
   cd backend
3. **Install Dependencies:**
   ```bash
   npm install
4. **Database Setup:**
Make sure you have MongoDB installed and running locally, or set up a cloud instance like MongoDB Atlas.
   ```bash
   MONGO_URI=mongodb://localhost:27017/financial_records_db (any db name)
   
   Alternatively, for MongoDB Atlas:
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/financial_records_db?retryWrites=true&w=majority
5. **Start the application:**
   ```bash
   npm start

# **API Endpoints:**
### 1. **Registering User**
   #### Endpoint: POST /register
   #### Description: Registers as a new user.
         Request Body:
            {
              "username": "abc",
              "password": "123456789",
            }
### 2. **Logining as a registered User**
   #### Endpoint: POST /login
   #### Description: Logining as a user.
         Request Body:
            {
              "username": "abc",
              "password": "123456789",
            }
         Response:
            {
            token: generated_token as value
            }

### 3. **Add a New Transaction**
   #### Endpoint: POST /transactions
   #### Description: Adds a new income or expense transaction.
         Request Body:
            {
              "type": "income",
              "category": "Salary",
              "amount": 1500,
              "date": "2024-10-20",
              "description": "Monthly salary"
            }

         Response:
            {
             "userId": "6717ec87112ea59e5496d0d2",
             "type": "income",
             "category": "Salary",
             "amount": 15000,
             "date": "2023-10-01T00:00:00.000Z",
             "description": "Monthly salary",
             "_id": "671844a54882d4f2d088d1aa",
             "__v": 0
            }
   





