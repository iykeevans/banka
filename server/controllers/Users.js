import jwt from 'jsonwebtoken';
import { hash, genSaltSync, compareSync } from 'bcrypt';
import shortid from 'shortid';
import { addUser, loginUser } from '../models/Users';
import { checkSignup, checkLogin } from '../helpers/validate';
// const { signup } = require('../helpers/email');

export const signup = async (req, res) => {
  try {
    const id = { id: shortid.generate() };
    const result = await checkSignup.validate({ ...id, ...req.body });
    const hashPassword = await hash(result.password, genSaltSync(10));
    result.password = hashPassword;
    const user = await addUser(result);

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
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = await checkLogin.validate(req.body);
    const user = await loginUser(result);

    if (!user) {
      res.status(401).json({
        status: 401,
        error: 'The credentials you provided are invalid',
      });
    } else if (user && !compareSync(result.password, user.password)) {
      res.status(401).json({
        status: 401,
        error: 'The credentials you provided are invalid',
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
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
  }
};
