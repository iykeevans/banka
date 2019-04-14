import { addAccount, removeAccount, editStatus } from '../models/Accounts';
import { findUser } from '../models/Users';

export const createAccount = async (req, res) => {
  try {
    const owner = { owner: req.user.id };
    const account = await addAccount({ ...owner, ...req.body });
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
    res.status(500).json({
      status: 500,
      error: error.message,
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
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { accountNumber, status } = await editStatus(req);
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
