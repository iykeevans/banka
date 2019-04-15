const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');

const Joi = BaseJoi.extend(Extension);

exports.checkSignup = Joi.object().keys({
  id: Joi.number().integer().required(),
  email: Joi.string().trim().lowercase().email()
    .required(),
  firstName: Joi.string().trim().lowercase().min(3)
    .required(),
  lastName: Joi.string().trim().lowercase().min(3)
    .required(),
  password: Joi.string().trim().required(),
  type: Joi.string().trim().lowercase().valid('client', 'staff')
    .required(),
  isAdmin: Joi.boolean().default(false),
});

exports.checkLogin = Joi.object().keys({
  email: Joi.string().trim().lowercase().email()
    .required(),
  password: Joi.string().trim().required(),
});

exports.checkAccount = Joi.object().keys({
  id: Joi.number().integer().required(),
  accountNumber: Joi.number().integer().required(),
  createdOn: Joi.date().format('MMMM Do YYYY, h:mm:ss a').required(),
  owner: Joi.number().required(),
  type: Joi.string().trim().uppercase().valid('savings', 'current')
    .required(),
  status: Joi.string().valid('draft', 'active', 'dormant').default('draft'),
  balance: Joi.number().required(),
});

exports.checkTransaction = Joi.object().keys({
  id: Joi.number().integer().required(),
  createdOn: Joi.date().format('MMMM Do YYYY, h:mm:ss a').required(),
  type: Joi.string().trim().lowercase().valid('credit', 'debit')
    .required(),
  accountNumber: Joi.number().integer().required(),
  cashier: Joi.number().required(),
  amount: Joi.number().required(),
  oldBalance: Joi.number().required(),
  newBalance: Joi.number().required(),
});

exports.checkStatus = Joi.object().keys({
  accountNumber: Joi.number().integer().required(),
  status: Joi.string().trim().lowercase().valid('active', 'dormant')
    .required()
});
