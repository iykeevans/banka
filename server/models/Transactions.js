import moment from 'moment';
import transactions from '../utils/dummyTransactions';
import { checkTransaction } from '../helpers/validate';

export default (transaction, accountNumber) => new Promise((resolve, reject) => {
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
