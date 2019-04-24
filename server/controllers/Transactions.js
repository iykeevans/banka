import moment from 'moment';
import shortid from 'shortid';
import { save, update, findOne } from '../models';
import { transactionQuery } from '../models/config/query';
import { checkTransaction } from '../helpers/validate';
// import { notification } from '../helpers/email';

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
    const { balance } = await findOne({ table: 'accounts', ...req.params });
    const type = req.route.path.split('/')[2];
    const { amount } = req.body;

    const result = await checkTransaction.validate({
      id: shortid.generate(),
      createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
      type,
      cashier: req.user.id,
      oldBalance: balance,
      newBalance: findBalance({ type, balance, amount }),
      ...req.params,
      amount,
    });

    if (result.newBalance < 0) {
      res.status(400).json({
        status: 400,
        error: 'The amount is greater than account balance',
      });
    } else {
      const transaction = await save([transactionQuery, result]);
      await update({ table: 'accounts', ...req.params, balance: result.newBalance });
      // await notification(transaction);
      res.status(201).json({
        status: 201,
        data: {
          transactionId: transaction.id,
          accountNumber: transaction.accountnumber,
          amount: transaction.amount,
          cashier: transaction.cashier,
          transactionType: transaction.type,
          accountBalance: transaction.newbalance,
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
        error: error.message,
      });
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
    const transaction = await findOne({ table: 'transactions', ...req.params });
    res.json({
      status: 200,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
