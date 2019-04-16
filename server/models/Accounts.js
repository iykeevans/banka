import accounts from '../utils/dummyAccounts';
import db from './config';

export const addAccount = account => new Promise((resolve) => {
  accounts.push(account);
  resolve(account);
});

export const removeAccount = ({ accountNumber }) => new Promise((resolve, reject) => {
  const account = accounts.findIndex(item => item.accountNumber === Number(accountNumber));
  if (account !== -1) {
    const data = accounts[account];
    accounts.splice(account, 1);
    resolve(data);
  } else {
    reject(new Error('Account doesn\'t exist'));
  }
});

export const editStatus = data => new Promise((resolve, reject) => {
  const account = accounts.findIndex(item => item.accountNumber === Number(data.accountNumber));
  if (account !== -1) {
    const result = accounts[account];
    result.status = data.status;
    resolve(data);
  } else {
    reject(new Error('Account doesn\'t exist'));
  }
});

export const findAccount = (data) => {
  const account = accounts.find(item => item.accountNumber === Number(data.accountNumber));
  return account;
};

export const editAccount = (data) => {
  const account = accounts.findIndex(item => item.accountNumber === Number(data.accountNumber));
  if (account !== -1) {
    const result = accounts[account];
    result.balance = data.newBalance;
  }
  return 'Account doesn\'t exist';
};
