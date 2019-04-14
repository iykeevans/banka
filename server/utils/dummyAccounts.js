import moment from 'moment';

export default [
  {
    id: 1,
    accountNumber: 6171257181,
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    owner: 1,
    type: 'savings',
    status: 'active',
    balance: 20000,
  },
  {
    id: 2,
    accountNumber: 6171257200,
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    owner: 2,
    type: 'current',
    status: 'inactive',
    balance: 10000,
  },
  {
    id: 3,
    accountNumber: 6171257244,
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
    owner: 3,
    type: 'savings',
    status: 'inactive',
    balance: 15000,
  },
];
