const express = require('express');
const { createAccount, deleteAccount } = require('../controllers/Accounts');

const router = express.Router();

router.post('/', createAccount);
router.delete('/:accountNumber', deleteAccount);

module.exports = router;
