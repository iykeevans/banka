import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import {
  string, integer, number, date, status,
} from './Schema';

const Joi = BaseJoi.extend(Extension);

export const checkAccount = Joi.object().keys({
  id: string.required(),
  accountNumber: integer,
  createdOn: date,
  owner: string.required(),
  type: string.valid('savings', 'current').required(),
  status: status.default('draft'),
  balance: number,
});

export const checkStatus = Joi.object().keys({
  accountNumber: integer,
  status: status.required(),
});
