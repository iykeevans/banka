import transactions from '../utils/dummyTransactions';

export default (transaction) => new Promise((resolve) => {
  transactions.push(transaction);
  resolve(transaction);
});
