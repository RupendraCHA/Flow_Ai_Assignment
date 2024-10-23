# Personal Expense Tracker Backend RESTful API Project
### Published backend web service URL on Render: 
https://personel-expense-tracker-backend.onrender.com/
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

# Published Link for the Collection of API Endpoints using Postman:
 Published Link: https://documenter.getpostman.com/view/33016734/2sAY4rDPvD#f9106598-13e4-4a10-842d-0bf549bcab37

# **API Endpoints:**
### 1. **Registering User**
   #### Endpoint: POST /register
   #### Description: Registers as a new user.
         Request Body:
            {
              "username": "abc",
              "password": "123456789",
            }

         ### If Registration is Successful:
         
         Response:
            {
            message: "User registered successfully!"
            }

         ### If same user again try to register:

         Response:
            {
            error: error.message
            }
         
### 2. **Logining as a registered User**
   #### Endpoint: POST /login
   #### Description: Logining as a user.
         Request Body:
            {
              "username": "abc",
              "password": "123456789",
            }

         ### With Successful Login: 
         Response:
            {
            token: "generated_token as a value"
            }

         ### If user not registered:
         Response: 
            {
            error: "Invalid Credentials"
            }

### 3. **Add a New Transaction**
   #### Endpoint: POST /transactions
   #### Description: Adds a new income or expense transaction.
         Headers: 
            token: token_value is given in the headers which is generated after succesful login
            
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
         
### **4. Get All Transactions:**
   #### Endpoint: GET /transactions
   #### Description: Retrieves all transactions.
            Headers: 
            token: token_value is given in the headers which is generated after succesful login
            
            Response:
              [
                {
                    "_id": "6717fb6ef5d0d924a6d2a8e9",
                    "userId": "6717ec87112ea59e5496d0d2",
                    "type": "expense",
                    "category": "ElectronicItems",
                    "amount": 10000,
                    "date": "2023-10-01T00:00:00.000Z",
                    "description": "Refrigirator Repair",
                    "__v": 0
                },
                {
                    "_id": "671844a54882d4f2d088d1aa",
                    "userId": "6717ec87112ea59e5496d0d2",
                    "type": "income",
                    "category": "Salary",
                    "amount": 5000,
                    "date": "2023-10-01T00:00:00.000Z",
                    "description": "Monthly salary",
                    "__v": 0
                }
            
              { ... }
            ]
### 5. Get Transaction by ID
   #### Endpoint: GET /transactions/:id
   #### Description: Retrieves a transaction by its ID.
            Headers: 
            token: token_value is given in the headers which is generated after succesful login
            
            Response:
            {
             "_id": "6717fb6ef5d0d924a6d2a8e9",
             "userId": "6717ec87112ea59e5496d0d2",
             "type": "expense",
             "category": "ElectronicItems",
             "amount": 10000,
             "date": "2023-10-01T00:00:00.000Z",
             "description": "Refrigirator Repair",
             "__v": 0
            }
### **6. Update Transaction by ID:**
   #### Endpoint: PUT /transactions/:id
   #### Description: Updates a transaction by ID.
             Headers: 
             token: token_value is given in the headers which is generated after succesful login
            
            Request Body (example of updating the amount):
            {
              "amount": 2050
            }
            
            Response:
            {
             "_id": "6717fb6ef5d0d924a6d2a8e9",
             "userId": "6717ec87112ea59e5496d0d2",
             "type": "expense",
             "category": "ElectronicItems",
             "amount": 2050,
             "date": "2023-10-01T00:00:00.000Z",
             "description": "Refrigirator Repair",
             "__v": 0
            }
### 7. Delete Transaction by ID
   #### Endpoint: DELETE /transactions/:id
   #### Description: Deletes a transaction by ID.
             Headers: 
             token: token_value is given in the headers which is generated after succesful login
             
            Response:
               {
                 "message": "Transaction deleted"
               }
### 8. Get Transaction Summary
   #### Endpoint: GET /summary
   #### Description: Retrieves a summary of total income, total expenses, and balance.
            Headers: 
             token: token_value is given in the headers which is generated after succesful login
             
            Response:
            {
              "totalIncome": 5000,
              "totalExpenses": 3200,
              "balance": 1800
            }

# Challenges:
**Data Validation:** Ensuring accurate and valid data entry for transactions (e.g., type, amount, category).

**Efficient Queries:** Implementing optimized queries for retrieving filtered transaction data and summaries.

**Error Management:** Handling errors such as incorrect transaction IDs or invalid input.

# Summary
This project is a RESTful API for managing personal finances. Users can add and track income or expense transactions, view their transaction history, and generate summaries by type. Built with Node.js, Express.js, and MongoDB, the API leverages Mongoose for structured data management.




