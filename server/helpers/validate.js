import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';

const Joi = BaseJoi.extend(Extension);

export const checkSignup = Joi.object().keys({
  id: Joi.string().required(),
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

export const checkLogin = Joi.object().keys({
  email: Joi.string().trim().lowercase().email()
    .required(),
  password: Joi.string().trim().required(),
});

export const checkAccount = Joi.object().keys({
  id: Joi.string().required(),
  accountNumber: Joi.number().integer().required(),
  createdOn: Joi.date().format('MMMM Do YYYY, h:mm:ss a').required(),
  owner: Joi.string().required(),
  type: Joi.string().trim().uppercase().valid('savings', 'current')
    .required(),
  status: Joi.string().valid('draft', 'active', 'dormant').default('draft'),
  balance: Joi.number().required(),
});

export const checkTransaction = Joi.object().keys({
  id: Joi.string().required(),
  createdOn: Joi.date().format('MMMM Do YYYY, h:mm:ss a').required(),
  type: Joi.string().trim().lowercase().valid('credit', 'debit')
    .required(),
  accountNumber: Joi.number().integer().required(),
  cashier: Joi.string().required(),
  amount: Joi.number().required(),
  oldBalance: Joi.number().required(),
  newBalance: Joi.number().required(),
});

export const checkStatus = Joi.object().keys({
  accountNumber: Joi.number().integer().required(),
  status: Joi.string().trim().lowercase().valid('active', 'dormant')
    .required(),
});
