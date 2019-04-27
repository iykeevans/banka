import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import {
  string, date, name, email, userType, password,
} from './Schema';

const Joi = BaseJoi.extend(Extension);

export const checkSignup = Joi.object().keys({
  id: string.required(),
  email,
  firstName: name,
  lastName: name,
  password,
  type: userType,
  isAdmin: Joi.boolean().default(false),
  createdOn: date,
});

export const checkLogin = Joi.object().keys({
  email,
  password,
});

export const checkEmail = Joi.object().keys({
  email,
});
