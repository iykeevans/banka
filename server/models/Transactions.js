const moment = require('moment');
const transactions = require('../utils/dummyTransactions');
const { checkTransaction } = require('../helpers/validate');

module.exports = (transaction, accountNumber) => new Promise((resolve, reject) => {
  const id = { id: transactions.length + 1 };
  const createdOn = { createdOn: moment().format('MMMM Do YYYY, h:mm:ss a') };
  checkTransaction.validate({
    ...id,
    ...accountNumber,
    ...createdOn,
    ...transaction,
  })
    .then((result) => {
      transactions.push(result);
      resolve(result);
    })
    .catch(error => reject(error));
});
