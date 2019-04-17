"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = [{
  id: 1,
  createdOn: (0, _moment["default"])().format('MMMM Do YYYY, h:mm:ss a'),
  type: 'debit',
  accountNumber: 617125781,
  cashier: 1,
  amount: 18999.99,
  oldBalance: 20000.76,
  newBalance: 1999.99
}];
exports["default"] = _default;
//# sourceMappingURL=dummyTransactions.js.map