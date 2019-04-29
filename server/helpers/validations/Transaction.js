import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import {
  string, integer, number, date,
} from './Schema';

const Joi = BaseJoi.extend(Extension);

const checkTransaction = Joi.object().keys({
  id: string.required(),
  createdOn: date,
  type: string.valid('credit', 'debit').required(),
  accountNumber: integer,
  cashier: string.required(),
  amount: number,
  oldBalance: number,
  newBalance: number,
});

export default checkTransaction;
