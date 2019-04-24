import express from 'express';
import bodyParser from 'body-parser';
import '@babel/polyfill';
import env from 'dotenv';
import routes from './routes';

env.config();

const app = express();
const port = process.env.PORT || 4000;

// parses QUERY string requests
app.use(bodyParser.urlencoded({ extended: false }));

// parses JSON requests
app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => console.log(`now listening to port ${port}`));

module.exports = app;
