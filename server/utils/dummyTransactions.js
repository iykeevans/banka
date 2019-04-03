const moment = require('moment');

module.exports = [
  {
    id: 1,
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    type: 'debit',
    accountNumber: 617125781,
    cashier: 1,
    amount: 18999.99,
    oldBalance: 20000.76,
    newBalance: 1999.99,
  },
];
