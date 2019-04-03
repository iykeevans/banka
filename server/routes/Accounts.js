const express = require('express');
const { createAccount, deleteAccount, changeStatus } = require('../controllers/Accounts');

const router = express.Router();

router.post('/', createAccount);
router.delete('/:accountNumber', deleteAccount);
router.patch('/:accountNumber', changeStatus);

module.exports = router;
