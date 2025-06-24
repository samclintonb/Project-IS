const express = require('express');
const cors = require('cors');
const db = require('./db'); // your db.js file

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// GET all clients
app.get('/api/clients', (req, res) => {
  db.all('SELECT * FROM clients', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST a new client
app.post('/api/clients', (req, res) => {
  const { name, email, phone, company } = req.body;
  const query = `INSERT INTO clients (name, email, phone, company) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, email, phone, company], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

// DELETE a client
app.delete('/api/clients/:id', (req, res) => {
  db.run('DELETE FROM clients WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
