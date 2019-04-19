import jwt from 'jsonwebtoken';
import { hash, genSaltSync, compareSync } from 'bcrypt';
import shortid from 'shortid';
import moment from 'moment';
import { save, findOne, find } from '../models';
import { userQuery } from '../models/config/query';
import { checkSignup, checkLogin } from '../helpers/validate';
// const { signup } = require('../helpers/email');

/**
 * @function signup
 * @description function to SIGN UP A USER.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports signup
 */
export const signup = async (req, res) => {
  try {
    const id = { id: shortid.generate() };
    const createdOn = { createdOn: moment(new Date()) };
    const result = await checkSignup.validate({ ...id, ...req.body, ...createdOn });
    const hashPassword = await hash(result.password, genSaltSync(10));
    result.password = hashPassword;

    if (result.isAdmin && result.type === 'client') {
      res.status(400).json({
        status: 400,
        error: 'Admin cannot be a client',
      });
    } else {
      const user = await save([userQuery, result]);
      const token = await jwt.sign({ id: user.id, email: user.email },
        process.env.SECRET,
        { expiresIn: '1h' });

      // await signup({ firstName, lastName, email });

      res.status(201).json({
        status: 201,
        data: {
          token,
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
        },
      });
    }
  } catch (error) {
    if (error.isJoi) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    } else {
      res.status(409).json({
        status: 409,
        error: 'Email already exist',
      });
    }
  }
};

/**
 * @function login
 * @description function to LOG IN A USER.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports login
 */
export const login = async (req, res) => {
  try {
    const result = await checkLogin.validate(req.body);
    const user = await findOne({ table: 'users', email: result.email });

    if (user && !compareSync(result.password, user.password)) {
      res.status(401).json({
        status: 401,
        error: 'The credentials you provided are invalid',
      });
    } else {
      const token = await jwt.sign({ id: user.id, isAdmin: user.is_admin },
        process.env.SECRET,
        { expiresIn: '1h' });

      res.json({
        status: 200,
        data: {
          token,
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
        },
      });
    }
  } catch (error) {
    if (error.isJoi) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    } else {
      res.status(401).json({
        status: 401,
        error: 'The credentials you provided are invalid',
      });
    }
  }
};

/**
 * @function userAccounts
 * @description function to GET ALL ACCOUNTS OWNED BY A SPECIFIC USER.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports userAccounts
 */
export const userAccounts = async (req, res) => {
  try {
    const user = await findOne({ table: 'users', ...req.params });
    const accounts = await find({ table: 'accounts', owner: user.id });
    res.json({
      status: 200,
      data: accounts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
