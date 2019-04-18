import { findAccount, editAccount } from '../models/Accounts';

export const debit = (req, res, next) => {
  const { balance } = findAccount(req.params);
  req.transaction = 'debit';
  req.Balance = { balance, newBalance: balance - req.body.amount };
  editAccount({ ...req.params, ...req.Balance });
  return next();
};

export const credit = (req, res, next) => {
  const { balance } = findAccount(req.params);
  req.transaction = 'credit';
  req.Balance = { balance, newBalance: balance + req.body.amount };
  editAccount({ ...req.params, ...req.Balance });
  return next();
};
