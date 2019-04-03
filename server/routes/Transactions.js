const express = require('express');
const { debit } = require('../controllers/Transactions');

const router = express.Router();

router.post('/:accountNumber/debit', debit);

module.exports = router;
