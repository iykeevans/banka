const express = require('express');
const { signup } = require('../controllers/Users');

const router = express.Router();

router.post('/signup', signup);

module.exports = router;
