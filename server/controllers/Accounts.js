import moment from 'moment';
import shortid from 'shortid';
import { addAccount, removeAccount, editStatus } from '../models/Accounts';
import { findUser } from '../models/Users';
import { checkAccount, checkStatus } from '../helpers/validate';

export const createAccount = async (req, res) => {
  try {
    const id = { id: shortid.generate() };
    const createdOn = { createdOn: moment().format('MMMM Do YYYY, h:mm:ss a') };
    const owner = { owner: req.user.id };
    const result = await checkAccount.validate({ ...id, ...createdOn, ...owner, ...req.body });
    const account = await addAccount(result);
    const user = findUser({ id: req.user.id });

    res.status(201).json({
      status: 201,
      data: {
        accountNumber: account.accountNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: account.type,
        openingBalance: account.balance,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    await removeAccount(req.params);
    res.json({
      status: 200,
      message: 'Account successfully deleted',
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      error,
    });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const result = await checkStatus.validate({ ...req.params, ...req.body });
    const { accountNumber, status } = await editStatus(result);
    res.json({
      status: 200,
      data: {
        accountNumber,
        status,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
