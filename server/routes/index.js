const express = require('express');
const user = require('./Users');
const account = require('./Accounts');
const transaction = require('./Transactions');

const router = express.Router();

router.all('/', (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to my Banka app',
  });
});

router.all('/api/v1', (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to my Banka API',
  });
});

router.use('/api/v1/auth', user);
router.use('/api/v1/accounts', account);
router.use('/api/v1/transactions', transaction);

module.exports = router;
