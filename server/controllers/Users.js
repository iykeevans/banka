const { hash, genSaltSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser, loginUser } = require('../models/Users');

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

exports.login = async (req, res) => {
  try {
    const user = await loginUser(req.body);

    if (!user) {
      res.status(400).json({
        status: 400,
        error: 'bad request',
      });
    } else {
      const token = await jwt.sign({ id: user.id },
        'dancer',
        { expiresIn: '1h' });

      res.json({
        status: 200,
        data: {
          token,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};