import moment from 'moment';
import shortid from 'shortid';
import ngfaker from 'ng-faker';
import {
  save,
  remove,
  findOne,
  find,
  update,
  findByResult,
} from '../models';
import { checkAccount, checkStatus } from '../helpers/validations/Accounts';
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
      accountNumber: ngfaker.account.accountNumber(),
      type: req.body.type,
      balance: req.body.balance,
    };
    const result = await checkAccount.validate(data);
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
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
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
    const { rows, rowCount } = await findByResult({ table: 'accounts', accountnumber: result.accountNumber });
    if (rowCount) {
      if (rows[0].status === result.status) {
        res.status(409).json({
          status: 409,
          error: `status is already defined as ${rows[0].status}`,
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
    } else {
      res.status(404).json({
        status: 404,
        error: 'accountnumber doesn\'t exist',
      });
    }
  } catch (error) {
    if (error.isJoi) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    } else {
      console.log(error);
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
    const { type, id } = req.user;
    const { rows, rowCount } = await findByResult({ table: 'accounts', ...req.params });
    if (rowCount) {
      const { owner } = rows[0];
      const transactions = await find({ table: 'transactions', ...req.params });
      if ((type === 'client' && id === owner) || type === 'staff') {
        if (transactions.length) {
          res.json({
            status: 200,
            data: transactions,
          });
        } else {
          res.status(404).json({
            status: 404,
            error: 'No data here',
          });
        }
      } else {
        res.json({
          status: 401,
          error: 'You are not allowed to view this resource',
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        error: 'This account number doesn\'t exist',
      });
    }
  } catch (error) {
    console.log(error);
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
  // TODO: WRITE JOI FOR req.params
  try {
    const { type, id } = req.user;
    const { rows, rowCount } = await findByResult({ table: 'accounts', ...req.params });
    if (rowCount) {
      if ((type === 'client' && id === rows[0].owner) || type === 'staff') {
        res.json({
          status: 200,
          data: rows[0],
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
        error: 'This resource doesn\'t exist',
      });
    }
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
      if (accounts.length) {
        res.json({
          status: 200,
          data: accounts,
        });
      } else {
        res.status(404).json({
          status: 404,
          error: 'This resource(S) doesn\'t exist',
        });
      }
    }
  } catch (error) {
    res.json({
      status: 500,
      error: error.message,
    });
  }
};
