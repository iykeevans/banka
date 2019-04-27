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

app.use((req, res, next) => {
  const error = new Error('something unexpected happened');
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: 400,
    error: error.message,
  });
});

app.listen(port, () => console.log(`now listening to port ${port}`));

module.exports = app;
