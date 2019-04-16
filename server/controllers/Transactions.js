import addTransaction from '../models/Transactions';
// import { notification } from '../helpers/email';

export default async (req, res) => {
  try {
    const transaction = await addTransaction(req.body, req.params);
    // await notification(transaction);
    res.status(201).json({
      status: 201,
      data: {
        transactionId: transaction.id,
        accountNumber: transaction.accountNumber,
        amount: transaction.amount,
        cashier: transaction.cashier,
        transactionType: transaction.type,
        accountBalance: transaction.newBalance,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
