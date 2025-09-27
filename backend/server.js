const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Simple test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!', success: true });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/signup.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Career Advisor running on http://localhost:${PORT}`);
    console.log(`📊 Test API: http://localhost:${PORT}/api/test`);
});