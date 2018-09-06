const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config')

const app = express();

app.use(cors());
app.use(bodyParser.json());

const { Pool } = require('pg');

pgClient = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port
});

pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values');
  res.send(values.rows);
});

app.post('/values', async (req, res) => {
  const index = req.body.index;

  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
  res.send({
    status: 'success'
  });
});

app.listen(5000, err => {
  console.log('Listening');
});
