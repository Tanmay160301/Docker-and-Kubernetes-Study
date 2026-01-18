import express from 'express';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

/**
 * Test DB connection
 */
app.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Database connected successfully',
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
