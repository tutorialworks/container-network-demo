const express = require('express');
const pg = require('pg');

const app = express();
const port = 8080;

const config = {
  host: process.env.DB_HOST || 'address-db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'addressapp',
  password: process.env.DB_PASSWORD || 'password123',
  database: process.env.DB_NAME || 'addressapp'
};

const pool = new pg.Pool(config);

app.get('/addresses', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM addresses');

    res.send(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
