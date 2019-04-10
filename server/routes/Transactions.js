const express = require('express');
const transaction = require('../controllers/Transactions');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/:accountNumber/debit', verifyToken, transaction);
router.post('/:accountNumber/credit', verifyToken, transaction);

module.exports = router;
