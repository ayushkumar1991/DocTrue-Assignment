const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'acme_landing',
  password: 'Ayush@123',
  port: 5432,
});
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('DB test failed:', err);
  } else {
    console.log('DB connection success:', res.rows[0]);
  }
  pool.end();
});
