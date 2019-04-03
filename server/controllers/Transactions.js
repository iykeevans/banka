const { debitTransaction } = require('../models/Transactions');

exports.debit = async (req, res) => {
  try {
    const transaction = await debitTransaction(req.body, req.params);
    res.status(201).json({
      status: 201,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
