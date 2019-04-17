import express from 'express';
import bodyParser from 'body-parser';
import '@babel/polyfill';
import env from 'dotenv';
import routes from './routes';

env.config();

const app = express();

app.use(bodyParser.json());

app.use(routes);

app.listen(3000, () => console.log('now listening to port 3000'));

module.exports = app;
