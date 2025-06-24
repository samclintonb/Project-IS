// Import required modules
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Database connection and configuration

// Create an Express application
const app = express();
const PORT = 3001;

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// --------------------------------------------
// ROUTES - CRUD operations for 'clients'
// --------------------------------------------

// GET all clients
app.get('/api/clients', (req, res) => {
  const query = 'SELECT * FROM clients';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error retrieving clients:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET a single client by ID (optional but useful)
app.get('/api/clients/:id', (req, res) => {
  const query = 'SELECT * FROM clients WHERE id = ?';
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      console.error('Error retrieving client:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(row);
  });
});

// POST a new client
app.post('/api/clients', (req, res) => {
  const { name, email, phone, company } = req.body;

  const query = `
    INSERT INTO clients (name, email, phone, company)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [name, email, phone, company], function (err) {
    if (err) {
      console.error('Error inserting client:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// PUT (Update) an existing client
app.put('/api/clients/:id', (req, res) => {
  const { name, email, phone, company } = req.body;

  const query = `
    UPDATE clients
    SET name = ?, email = ?, phone = ?, company = ?
    WHERE id = ?
  `;

  db.run(query, [name, email, phone, company, req.params.id], function (err) {
    if (err) {
      console.error('Error updating client:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ updated: this.changes });
  });
});

// DELETE a client
app.delete('/api/clients/:id', (req, res) => {
  const query = 'DELETE FROM clients WHERE id = ?';

  db.run(query, [req.params.id], function (err) {
    if (err) {
      console.error('Error deleting client:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ deleted: this.changes });
  });
});

// --------------------------------------------
// Start the server
// --------------------------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
