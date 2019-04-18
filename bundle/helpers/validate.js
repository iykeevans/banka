"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkStatus = exports.checkTransaction = exports.checkAccount = exports.checkLogin = exports.checkSignup = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _joiDateExtensions = _interopRequireDefault(require("joi-date-extensions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Joi = _joi["default"].extend(_joiDateExtensions["default"]);

var checkSignup = Joi.object().keys({
  id: Joi.number().integer().required(),
  email: Joi.string().trim().lowercase().email().required(),
  firstName: Joi.string().trim().lowercase().min(3).required(),
  lastName: Joi.string().trim().lowercase().min(3).required(),
  password: Joi.string().trim().required(),
  type: Joi.string().trim().lowercase().valid('client', 'staff').required(),
  isAdmin: Joi["boolean"]()["default"](false)
});
exports.checkSignup = checkSignup;
var checkLogin = Joi.object().keys({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().trim().required()
});
exports.checkLogin = checkLogin;
var checkAccount = Joi.object().keys({
  id: Joi.number().integer().required(),
  accountNumber: Joi.number().integer().required(),
  createdOn: Joi.date().format('MMMM Do YYYY, h:mm:ss a').required(),
  owner: Joi.number().required(),
  type: Joi.string().trim().uppercase().valid('savings', 'current').required(),
  status: Joi.string().valid('draft', 'active', 'dormant')["default"]('draft'),
  balance: Joi.number().required()
});
exports.checkAccount = checkAccount;
var checkTransaction = Joi.object().keys({
  id: Joi.number().integer().required(),
  createdOn: Joi.date().format('MMMM Do YYYY, h:mm:ss a').required(),
  type: Joi.string().trim().lowercase().valid('credit', 'debit').required(),
  accountNumber: Joi.number().integer().required(),
  cashier: Joi.number().required(),
  amount: Joi.number().required(),
  oldBalance: Joi.number().required(),
  newBalance: Joi.number().required()
});
exports.checkTransaction = checkTransaction;
var checkStatus = Joi.object().keys({
  accountNumber: Joi.number().integer().required(),
  status: Joi.string().trim().lowercase().valid('active', 'dormant').required()
});
exports.checkStatus = checkStatus;
//# sourceMappingURL=validate.js.map