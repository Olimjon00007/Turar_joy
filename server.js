const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1. SERVE STATIC FILES
// This allows running the frontend and backend on the same port
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'kvartira_db'
});

db.connect((err) => {
    if (err) {
        console.error('CRITICAL: MySQL-ga ulanib bo\'lmadi! Iltimos XAMPP/MySQL-ni yoqing.');
        console.error('Xato tafsiloti:', err.message);
    } else {
        console.log('MySQL muvaffaqiyatli ulandi!');
    }
});

// Middleware to check DB status
const checkDb = (req, res, next) => {
    if (db.state === 'disconnected') {
        return res.status(503).json({ success: false, error: 'Ma\'lumotlar bazasi bilan aloqa yo\'q. Iltimos server admini bilan bog\'laning.' });
    }
    next();
};

// --- API ROUTES ---

// Auth
app.post('/api/login', checkDb, (req, res) => {
    const { username, password } = req.body;
    if (username === 'owner' && password === 'owner123') {
        return res.json({ success: true, role: 'owner' });
    }
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length > 0) {
            res.json({ success: true, role: result[0].role });
        } else {
            res.status(401).json({ success: false, message: 'Login yoki parol xato!' });
        }
    });
});

// Listings
app.get('/api/listings', (req, res) => {
    const sql = 'SELECT * FROM estates ORDER BY id DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/listings', (req, res) => {
    const estate = req.body;
    const sql = 'INSERT INTO estates SET ?';
    db.query(sql, estate, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: result.insertId });
    });
});

app.delete('/api/listings/:id', (req, res) => {
    const sql = 'DELETE FROM estates WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Admins
app.get('/api/admins', (req, res) => {
    const sql = "SELECT id, username, role FROM users WHERE role = 'admin'";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/admins', (req, res) => {
    const { username, password } = req.body;
    const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, 'admin')";
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: result.insertId });
    });
});

// Root Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
