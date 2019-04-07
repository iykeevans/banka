const { addAccount, removeAccount, editStatus } = require('../models/Accounts');

exports.createAccount = async (req, res) => {
  try {
    const account = await addAccount(req.body);
    res.status(201).json({
      status: 201,
      data: account,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
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

exports.changeStatus = async (req, res) => {
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
