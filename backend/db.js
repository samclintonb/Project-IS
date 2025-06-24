<<<<<<< HEAD
const fs = require('fs');
=======
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});
>>>>>>> a2a1ea6 (updated db.js (self))

// Load and execute schema.sql on startup
const schemaPath = path.resolve(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

db.exec(schema, (err) => {
  if (err) {
    console.error('Error running schema.sql:', err.message);
  } else {
    console.log('Database initialized using schema.sql');
  }
});
