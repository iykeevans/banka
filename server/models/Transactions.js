const transactions = require('../utils/dummyTransactions');
const { checkTransaction } = require('../helpers/validate');

exports.debitTransaction = (transaction, accountNumber) => new Promise((resolve, reject) => {
  const id = { id: transactions.length + 1 };
  checkTransaction({ ...id, ...accountNumber, ...transaction })
    .then((result) => {
      transactions.push(result);
      resolve(result);
    })
    .catch(error => reject(error));
});
