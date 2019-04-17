import moment from 'moment';
import shortid from 'shortid';
import {
  save,
  remove,
  findOne,
  update,
} from '../models';
import { checkAccount, checkStatus } from '../helpers/validate';
import { accountQuery } from '../models/config/query';

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
        error: 'account number already exists',
      });
    }
  }
};

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
