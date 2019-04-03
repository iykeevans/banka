const addTransaction = require('../models/Transactions');

module.exports = async (req, res) => {
  try {
    const transaction = await addTransaction(req.body, req.params);
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
