const express = require('express');
const { signup, login } = require('../controllers/Users');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', login);

module.exports = router;
