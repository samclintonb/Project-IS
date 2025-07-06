const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define database path
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Initialize SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Load and run schema.sql on startup
const schemaPath = path.resolve(__dirname, 'schema.sql');
fs.readFile(schemaPath, 'utf-8', (err, schema) => {
  if (err) {
    console.error('Error reading schema.sql:', err.message);
    return;
  }

  db.exec(schema, (err) => {
    if (err) {
      console.error('Error executing schema.sql:', err.message);
    } else {
      console.log('Database initialized using schema.sql.');
    }
  });
});

module.exports = db;
