const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const routes = require('./routes');

env.config();

const app = express();

app.use(bodyParser.json());

app.use(routes);

app.listen(3000, () => console.log('now listening to port 3000'));

module.exports = app;
