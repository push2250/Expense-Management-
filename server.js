
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'expenses.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Initialize empty data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ expenses: [] }));
}

// Get all expenses
app.get('/api/expenses', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data.expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error reading expenses' });
  }
});

// Add new expense
app.post('/api/expenses', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    const newExpense = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    data.expenses.push(newExpense);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Error adding expense' });
  }
});

// Delete expense
app.delete('/api/expenses/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    data.expenses = data.expenses.filter(expense => expense.id !== req.params.id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting expense' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
