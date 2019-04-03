const express = require('express');
const { createAccount } = require('../controllers/Accounts');

const router = express.Router();

router.post('/', createAccount);

module.exports = router;
