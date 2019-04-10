const express = require('express');
const { createAccount, deleteAccount, changeStatus } = require('../controllers/Accounts');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/', verifyToken, createAccount);
router.delete('/:accountNumber', verifyToken, deleteAccount);
router.patch('/:accountNumber', verifyToken, changeStatus);

module.exports = router;
