const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'kvartira_db'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL ulanishda xato:', err);
    } else {
        console.log('MySQL muvaffaqiyatli ulandi!');
    }
});

// --- AUTHENTICATION ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check Owner (Hardcoded for demo, but can be in DB)
    if (username === 'owner' && password === 'owner123') {
        return res.json({ success: true, role: 'owner' });
    }

    // Check Admins in DB
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

// --- LISTINGS ---
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

// --- ADMINS ---
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

app.delete('/api/admins/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishlamoqda...`);
});
