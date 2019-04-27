import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';

const Joi = BaseJoi.extend(Extension);

const string = Joi.string().trim();
const name = string.regex(/^[A-Za-z][^0-9]+$/).min(3).max(15);
const email = string.email().required();
const password = string.min(6).required();
const number = Joi.number().positive().required();
const integer = number.integer();
const status = string.valid('draft', 'active', 'dormant');
const userType = string.valid('client', 'staff');
const date = Joi.date().format('MMMM Do YYYY, h:mm:ss a').required();

export {
  string, name, email, integer, number, date, status, userType, password,
};
