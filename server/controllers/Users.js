import jwt from 'jsonwebtoken';
import { hashSync, genSaltSync, compareSync } from 'bcrypt-nodejs';
import shortid from 'shortid';
import moment from 'moment';
import {
  save, find, findByResult,
} from '../models';
import { userQuery } from '../models/config/query';
import { checkSignup, checkLogin, checkEmail } from '../helpers/validations/Users';
import { signup } from '../helpers/email'

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
    let { type } = req.body;
    const {
      password, firstName, lastName, isAdmin,
    } = req.body;

    type = (req.user) ? 'staff' : 'client';

    const result = await checkSignup.validate({
      id: shortid.generate(),
      createdOn: moment(new Date()),
      email: req.body.email,
      password,
      firstName,
      lastName,
      type,
      isAdmin,
    });

    if (result.isAdmin && result.type !== 'staff') {
      res.status(400).json({
        status: 400,
        error: 'Please admin must be a staff',
      });
    } else {
      const hashPassword = hashSync(result.password, genSaltSync(10));
      result.password = hashPassword;
      const user = await find({ table: 'users', email: result.email });
      if (user.length) {
        res.status(409).json({
          status: 409,
          error: 'User already exists',
        });
      } else {
        const {
          id, firstname, lastname, email,
        } = await save([userQuery, result]);
        const token = await jwt.sign({ id, email },
          process.env.SECRET,
          { expiresIn: '1h' });
        
        await signup({ firstname, lastname, email});
        res.status(201).json({
          status: 201,
          data: {
            token,
            id,
            firstName: firstname,
            lastName: lastname,
            email,
          },
        });
      }
    }
  } catch (error) {
    if (error.isJoi) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    } else {
      res.status(500).json({
        status: 500,
        error: error.message,
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
    const user = await find({ table: 'users', email: result.email });
    if (!user.length) {
      res.status(401).json({
        status: 401,
        error: 'The credentials you provided are invalid',
      });
    } else if (user.length && !compareSync(result.password, user[0].password)) {
      res.status(401).json({
        status: 401,
        error: 'The credentials you provided are invalid',
      });
    } else {
      const token = await jwt.sign({ id: user[0].id, isAdmin: user[0].is_admin },
        process.env.SECRET,
        { expiresIn: '1h' });

      res.json({
        status: 200,
        data: {
          token,
          id: user[0].id,
          firstName: user[0].firstname,
          lastName: user[0].lastname,
          email: user[0].email,
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
      res.status(500).json({
        status: 500,
        error,
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
    const { type, id } = req.user;
    const { email } = await checkEmail.validate(req.params);
    const { rows, rowCount } = await findByResult({ table: 'users', email });
    if (rowCount) {
      const accounts = await find({ table: 'accounts', owner: rows[0].id });
      if ((type === 'client' && id === accounts.owner) || type === 'staff') {
        res.json({
          status: 200,
          data: accounts,
        });
      } else {
        res.status(401).json({
          status: 401,
          error: 'You are not allowed to view this resource',
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        error: 'email doesn\'t exist',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
