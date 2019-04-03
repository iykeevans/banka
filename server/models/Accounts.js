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
