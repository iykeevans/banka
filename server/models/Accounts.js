import accounts from '../utils/dummyAccounts';

const addAccount = account => new Promise((resolve) => {
  accounts.push(account);
  resolve(account);
});

const removeAccount = ({ accountNumber }) => new Promise((resolve, reject) => {
  const account = accounts.findIndex(item => item.accountNumber === Number(accountNumber));
  if (account !== -1) {
    const data = accounts[account];
    accounts.splice(account, 1);
    resolve(data);
  } else {
    reject(new Error('Account doesn\'t exist'));
  }
});

const editStatus = (data) => new Promise((resolve) => {
  const account = accounts.findIndex(item => item.accountNumber === Number(data.accountNumber));
  if (account !== -1) {
    const result = accounts[account];
    result.status = data.status;
    resolve(data);
  } else {
    reject(new Error('Account doesn\'t exist'));
  }
});

export { addAccount, removeAccount, editStatus };
