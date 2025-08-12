const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: 'postgres',            
  host: 'localhost',
  database: 'acme_landing',
  password: 'Ayush@123',   
  port: 5432,
});


//  GET endpoint 
app.get('/api/content', (req, res) => {
  res.json({
    connect_title: "Connect with Us",
    connect_desc:
      "We're here to help. Reach out to us with any questions or inquiries you may have. Our team is providing prompt and helpful assistance. Subtle icons related to communication and support are in the background.",
    reach_title: "How to Reach Us",
    reach_desc:
      "We offer multiple ways to get in touch, ensuring you can reach us through your preferred method. Our team is ready to assist you with any inquiries or support you may need.",
    reach_options: [
      {
        label: "Phone",
        desc: "Call us directly during business hours for immediate assistance.",
      },
      {
        label: "Email",
        desc: "Send us an email, and we’ll respond within 24 hours.",
      },
      {
        label: "Address",
        desc: "Visit our office located in the heart of the city.",
      },
    ],
  });
});

//  POST endpoint 
app.post('/api/contact', async (req, res) => {
  console.log('Incoming body:', req.body);
  const { name, contact, email } = req.body;

  if (!name || !contact || !email) {
    console.log("Validation failed - Missing field");
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await pool.query(
      `INSERT INTO contact_submissions (name, contact, email) VALUES ($1, $2, $3)`,
      [name, contact, email]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
});



app.listen(3001, () => {
  console.log('Server running on :3001');
});
