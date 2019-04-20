import ngfaker from 'ng-faker';
import moment from 'moment';
import shortid from 'shortid';
import db from '.';
import { accountQuery, transactionQuery, userQuery } from './query';

const id = shortid.generate();

const user = {
  id,
  email: `${ngfaker.name.firstName()}@gmail.com`,
  firstName: ngfaker.name.firstName(),
  lastName: ngfaker.name.lastName(),
  password: shortid.generate(),
  type: 'client',
  isAdmin: false,
  createdOn: moment(new Date()),
};

const account = {
  id: shortid.generate(),
  accountNumber: ngfaker.account.accountNumber(),
  owner: id,
  type: 'savings',
  status: 'active',
  balance: Math.random() * 10000,
  createdOn: moment(new Date()),
};

const transaction = {
  id: shortid.generate(),
  accountNumber: ngfaker.account.accountNumber(),
  cashier: id,
  type: 'debit',
  amount: Math.random() * 10000,
  oldBalance: Math.random() * 10000,
  newBalance: Math.random() * 10000,
  createdOn: moment(new Date()),
};

const seed = async () => {
  try {
    await db.one(userQuery, user);
    await db.one(accountQuery, account);
    await db.one(transactionQuery, transaction);
    console.log('*****seeding successful*****');
  } catch (error) {
    console.log(error.message);
  }
};

seed();
