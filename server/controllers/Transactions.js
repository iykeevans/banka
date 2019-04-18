import moment from 'moment';
import shortid from 'shortid';
import addTransaction from '../models/Transactions';
import { checkTransaction } from '../helpers/validate';
// import { notification } from '../helpers/email';

export default async (req, res) => {
  try {
    const id = { id: shortid.generate() };
    const createdOn = { createdOn: moment().format('MMMM Do YYYY, h:mm:ss a') };
    const result = await checkTransaction.validate({
      ...id,
      ...createdOn,
      ...req.params,
      newBalance: req.Balance.newBalance,
      type: req.transaction,
      amount: req.body.amount,
      cashier: req.user.id,
      oldBalance: req.Balance.balance,
    });
    const transaction = await addTransaction(result);
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
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
  }
};
