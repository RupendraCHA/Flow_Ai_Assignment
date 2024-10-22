const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3500;

app.use(express.json())

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personalFinance');

// User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Transaction schema and model
const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    type: { type: String, required: true }, // 'income' or 'expense'
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Middleware to authenticate JWT
// ['authorization']?.split(' ')[1];
const authenticateJWT = (req, res, next) => {
    const {token} = req.headers
    if (token) {
        jwt.verify(token, 'your_jwt_secret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get("/", (req, res) => {
    res.send("Server Running and API starting is successful!")
})

// User registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ username, password: hashedPassword });
    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// User login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
    res.json({ token });
});

// POST /transactions: Adds a new transaction
app.post('/transactions', authenticateJWT, async (req, res) => {
    try {
        const transaction = new Transaction({ ...req.body, userId: req.user.id });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /transactions: Retrieves all transactions for the authenticated user
app.get('/transactions', authenticateJWT, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /transactions/:id: Retrieves a transaction by ID
app.get('/transactions/:id', authenticateJWT, async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.user.id });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (err) {
        res.status(400).json({ error: 'Invalid transaction ID' });
    }
});

// PUT /transactions/:id: Updates a transaction by ID
app.put('/transactions/:id', authenticateJWT, async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (err) {
        res.status(400).json({ error: 'Invalid transaction ID or input' });
    }
});

// DELETE /transactions/:id: Deletes a transaction by ID
app.delete('/transactions/:id', authenticateJWT, async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /summary: Retrieves a summary of transactions for the authenticated user
app.get('/summary', authenticateJWT, async (req, res) => {
    try {
        const totalIncome = await Transaction.aggregate([
            { $match: { type: 'income', userId: new mongoose.Types.ObjectId(req.user.id) } },
            { $group: { _id: null, totalIncome: { $sum: '$amount' } } },
        ]);

        const totalExpenses = await Transaction.aggregate([
            { $match: { type: 'expense', userId: new mongoose.Types.ObjectId(req.user.id) } },
            { $group: { _id: null, totalExpenses: { $sum: '$amount' } } },
        ]);

        const balance = (totalIncome[0]?.totalIncome || 0) - (totalExpenses[0]?.totalExpenses || 0);

        res.json({
            totalIncome: totalIncome[0]?.totalIncome || 0,
            totalExpenses: totalExpenses[0]?.totalExpenses || 0,
            balance,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
