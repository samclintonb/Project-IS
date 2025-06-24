const fs = require('fs');

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
