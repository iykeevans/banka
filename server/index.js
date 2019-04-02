const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'welcome to the API',
  });
});

app.listen(3000, () => console.log('now listening to port 3000'));

module.exports = app;
