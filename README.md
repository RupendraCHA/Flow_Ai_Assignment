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
   MONGO_URI=mongodb://localhost:27017/financial_records_db
   
   **Alternatively, for MongoDB Atlas:**
   ```bash
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/financial_records_db?retryWrites=true&w=majority
   





