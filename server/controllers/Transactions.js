import moment from 'moment';
import shortid from 'shortid';
import {
  save, update, findOne, findByResult,
} from '../models';
import { transactionQuery } from '../models/config/query';
import checkTransaction from '../helpers/validations/Transaction';

/**
 * @function findBalance
 * @description function to CALCULATE A USERS NEW BALANCE.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @returns {number} NEW BALANCE
 * @exports findBalance
 */
const findBalance = ({ type, balance, amount }) => {
  if (type === 'debit') {
    return balance - amount;
  }
  return balance + amount;
};

/**
 * @function findBalance
 * @description function to DEBIT OR CREDIT AN ACCOUNT.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports createTransaction
 */
export const createTransaction = async (req, res) => {
  try {
    const { rows, rowCount } = await findByResult({ table: 'accounts', ...req.params });
    if (rowCount) {
      const { balance } = rows[0];
      const routeType = req.route.path.split('/')[2];

      const result = await checkTransaction.validate({
        id: shortid.generate(),
        createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
        type: routeType,
        cashier: req.user.id,
        oldBalance: balance,
        newBalance: findBalance({ type: routeType, balance, amount: req.body.amount }),
        ...req.params,
        amount: req.body.amount,
      });

      if (result.newBalance < 0) {
        res.status(400).json({
          status: 400,
          error: 'Insufficient funds',
        });
      } else {
        const {
          id, accountnumber, type, amount, cashier, newbalance,
        } = await save([transactionQuery, result]);
        await update({ table: 'accounts', ...req.params, balance: result.newBalance });

        res.status(201).json({
          status: 201,
          data: {
            transactionId: id,
            accountNumber: accountnumber,
            amount,
            cashier,
            transactionType: type,
            accountBalance: newbalance,
          },
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        error: 'This accountnumber doesn\'t exist',
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
 * @function getTransaction
 * @description function to A SPECIFIC TRANSACTION DETAILS.
 * @param {object} req - the user request object
 * @param {object} res - the user response object
 * @returns {object} API RESPONSE IN JSON FORMAT
 * @exports getTransaction
 */
export const getTransaction = async (req, res) => {
  try {
    const { type, id } = req.user;
    const transaction = await findByResult({ table: 'transactions', ...req.params });
    const { rows, rowCount } = transaction;
    if (rowCount) {
      const { owner } = await findOne({ table: 'accounts', accountnumber: rows[0].accountnumber });
      if ((type === 'client' && id === owner) || type === 'staff') {
        res.json({
          status: 200,
          data: transaction,
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
        error: 'This transaction ID doesn\'t exist',
      });
    }
  } catch (error) {
    console.log(error);
  }
};
