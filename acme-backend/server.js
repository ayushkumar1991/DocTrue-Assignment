const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'acme_landing',
  password: 'Ayush@123',
  port: 5432,
});

// Sample content endpoint
app.get('/api/content', (req, res) => {
  res.json({
    connect_title: "Connect with Us",
    connect_desc: "We're here to help. Reach out to us with any questions or inquiries you may have. Our team is ready to provide prompt and helpful assistance.",
    reach_title: "How to Reach Us",
    reach_desc: "We offer multiple ways to get in touch. Choose the method that’s easiest for you, and we’ll be happy to assist.",
    reach_options: [
      { label: "Phone", desc: "Call us during business hours for quick assistance." },
      { label: "Email", desc: "Send an email and we’ll reply within 24 hours." },
      { label: "Address", desc: "Visit our office in the heart of the city." }
    ],
  });
});

// Save contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, contact, email } = req.body;

  if (!name || !contact || !email) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    await pool.query(
      'INSERT INTO contact_submissions (name, contact, email) VALUES ($1, $2, $3)',
      [name, contact, email]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error inserting into database:', error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Start server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
