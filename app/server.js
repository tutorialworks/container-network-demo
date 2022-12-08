const express = require('express');
const pg = require('pg');

const app = express();
const port = 8080;

const config = {
  user: 'addressapp',
  password: 'password123',
  host: 'address-db',
  port: 5432,
  database: 'addressapp',
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
