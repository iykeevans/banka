const { hash, genSaltSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser, loginUser } = require('../models/Users');
// const { signup } = require('../helpers/email');

exports.signup = async (req, res) => {
  try {
    const hashPassword = await hash(req.body.password, genSaltSync(10));
    req.body.password = hashPassword;
    const user = await addUser(req.body);

    const token = await jwt.sign({ id: user.id, email: user.email },
      process.env.SECRET,
      { expiresIn: '1h' });

    // await signup({ firstName, lastName, email });

    res.status(201).json({
      status: 201,
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
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
      const token = await jwt.sign({ id: user.id, email: user.email },
        process.env.SECRET,
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
