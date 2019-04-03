const express = require('express');
const transaction = require('../controllers/Transactions');

const router = express.Router();

router.post('/:accountNumber/debit', transaction);
router.post('/:accountNumber/credit', transaction);

module.exports = router;
