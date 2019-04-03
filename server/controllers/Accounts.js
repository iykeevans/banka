const { addAccount } = require('../models/Accounts');

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
