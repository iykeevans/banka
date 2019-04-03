const accounts = require('../utils/dummyAccounts');
const { checkAccount } = require('../helpers/validate');

exports.addAccount = account => new Promise((resolve, reject) => {
  const id = { id: accounts.length + 1 };
  checkAccount({ ...id, ...account })
    .then((result) => {
      accounts.push(result);
      resolve(result);
    })
    .catch(error => reject(error));
});

exports.removeAccount = accountNumber => new Promise((resolve, reject) => {
  const account = accounts.findIndex(item => item.accountNumber === Number(accountNumber));
  if (account !== -1) {
    const data = accounts[account];
    accounts.splice(account, 1);
    resolve(data);
  } else {
    reject(new Error('Account doesn\'t exist'));
  }
});
