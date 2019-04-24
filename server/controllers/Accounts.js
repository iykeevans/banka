import moment from 'moment';
import shortid from 'shortid';
import {
  save,
  remove,
  findOne,
  find,
  update,
} from '../models';
import { checkAccount, checkStatus } from '../helpers/validate';
import { accountQuery } from '../models/config/query';

/**
 * @function createAccount
 * @description function CREATE ACCOUNT.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports createAccount
 */
export const createAccount = async (req, res) => {
  try {
    const data = {
      id: shortid.generate(),
      createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
      owner: req.user.id,
    };
    const result = await checkAccount.validate({ ...data, ...req.body });
    const { accountnumber, type, balance } = await save([accountQuery, result]);
    const { firstname, lastname, email } = await findOne({ table: 'users', id: req.user.id });

    res.status(201).json({
      status: 201,
      data: {
        accountNumber: accountnumber,
        firstName: firstname,
        lastName: lastname,
        email,
        type,
        openingBalance: balance,
      },
    });
  } catch (error) {
    if (error.isJoi) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    } else {
      res.status(409).json({
        status: 409,
        error: 'account already exists',
      });
    }
  }
};

/**
 * @function deleteAccount
 * @description function to DELETE ACCOUNT.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports deleteAccount
 */
export const deleteAccount = async (req, res) => {
  try {
    const { rowCount } = await remove({ table: 'accounts', ...req.params });
    if (rowCount) {
      res.json({
        status: 200,
        message: `${rowCount} Account successfully deleted`,
      });
    } else {
      res.status(404).json({
        status: 404,
        error: 'Account either doesn\'t exist or has been deleted',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'accountNumber must be a number',
    });
  }
};

/**
 * @function changeStatus
 * @description function to CHANGE ACCOUNT STATUS.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports changeStatus
 */
export const changeStatus = async (req, res) => {
  try {
    const result = await checkStatus.validate({ ...req.params, ...req.body });
    const account = await findOne({ table: 'accounts', accountnumber: result.accountNumber });

    if (account.status === result.status) {
      res.status(409).json({
        status: 409,
        error: `status is already defined as ${account.status}`,
      });
    } else {
      const { accountnumber, status } = await update({ table: 'accounts', ...result });
      res.json({
        status: 200,
        data: {
          accountNumber: accountnumber,
          status,
        },
      });
    }
  } catch (error) {
    // console.log(error);
    if (error.isJoi) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    } else {
      res.status(404).json({
        status: 404,
        error: 'Account either doesn\'t exist or has been deleted',
      });
    }
  }
};

/**
 * @function getHistory
 * @description function to GET ACCOUNT'S TRANSACTION HISTORY.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports getHistory
 */
export const getHistory = async (req, res) => {
  try {
    const transactions = await find({ table: 'transactions', ...req.params });
    if (transactions.length) {
      res.json({
        status: 200,
        data: transactions,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'Nothing found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'invalid account number',
    });
  }
};

/**
 * @function getAccount
 * @description function to GET A SPECIFIC ACCOUNT DETAIL.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports getAccount
 */
export const getAccount = async (req, res) => {
  try {
    const account = await findOne({ table: 'accounts', ...req.params });
    res.json({
      status: 200,
      data: account,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

/**
 * @function getAccounts
 * @description function to GET ALL ACCOUNTS DETAIL OR ALL ACTIVE/DORMANT ACCOUNTS.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports getAccounts
 */
export const getAccounts = async (req, res) => {
  try {
    const { status } = req.query;
    if (status) {
      const accounts = await find({ table: 'accounts', status });
      if (accounts.length) {
        res.json({
          status: 200,
          data: accounts,
        });
      } else {
        res.status(404).json({
          status: 404,
          error: `No accounts with status ${status}`,
        });
      }
    } else {
      const accounts = await find({ table: 'accounts' });
      res.json({
        status: 200,
        data: accounts,
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      error: error.message,
    });
  }
};
