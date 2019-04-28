import ngfaker from 'ng-faker';
import { hashSync, genSaltSync } from 'bcrypt-nodejs';
import moment from 'moment';
import shortid from 'shortid';
import db from '.';
import { accountQuery, transactionQuery, userQuery } from './query';

const id = shortid.generate();
const password = hashSync('rosemary', genSaltSync(10));

const user = {
  id,
  email: 'elochi238@gmail.com',
  firstName: 'ikenna',
  lastName: 'ezeani',
  password,
  type: 'staff',
  isAdmin: true,
  createdOn: moment(new Date()),
};

const account = {
  id: shortid.generate(),
  accountNumber: ngfaker.account.accountNumber(),
  owner: id,
  type: 'savings',
  status: 'draft',
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

/**
 * @function seed
 * @description function to SEED DATABASE.
 * @param {object} data - table to search in with data
 * @returns {object} QUERY RESPONSE IN JSON FORMAT
 */
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
