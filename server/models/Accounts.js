const moment = require('moment');
const accounts = require('../utils/dummyAccounts');
const { checkAccount, checkStatus } = require('../helpers/validate');

exports.addAccount = account => new Promise((resolve, reject) => {
  const id = { id: accounts.length + 1 };
  const createdOn = { createdOn: moment().format('MMMM Do YYYY, h:mm:ss a') };
  checkAccount.validate({ ...id, ...createdOn, ...account })
    .then((result) => {
      accounts.push(result);
      resolve(result);
    })
    .catch(error => reject(error));
});

exports.removeAccount = ({ accountNumber }) => new Promise((resolve, reject) => {
  const account = accounts.findIndex(item => item.accountNumber === Number(accountNumber));
  if (account !== -1) {
    const data = accounts[account];
    accounts.splice(account, 1);
    resolve(data);
  } else {
    reject(new Error('Account doesn\'t exist'));
  }
});

exports.editStatus = ({ params, body }) => new Promise((resolve, reject) => {
  checkStatus.validate({ ...params, ...body })
    .then((result) => {
      // console.log(result)
      const account = accounts.findIndex(item => item.accountNumber === result.accountNumber);
      if (account !== -1) {
        const data = accounts[account];
        data.status = result.status;
        resolve(data);
      } else {
        reject(new Error('Account doesn\'t exist'));
      }
    })
    .catch(error => reject(error));
  
});
