const { hash, genSaltSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser } = require('../models/Users');

exports.signup = async (req, res) => {
  try {
    const hashPassword = await hash(req.body.password, genSaltSync(10));
    req.body.password = hashPassword;
    const {
      id,
      firstName,
      lastName,
      email,
    } = await addUser(req.body);
    const token = await jwt.sign({ id },
      'dancer',
      { expiresIn: '1h' });
    res.status(201).json({
      status: 201,
      data: {
        token,
        id,
        firstName,
        lastName,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
