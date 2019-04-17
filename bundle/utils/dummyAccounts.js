"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = [{
  id: 1,
  accountNumber: 6171257181,
  createdOn: (0, _moment["default"])().format('MMMM Do YYYY, h:mm:ss a'),
  owner: 1,
  type: 'savings',
  status: 'active',
  balance: 20000
}, {
  id: 2,
  accountNumber: 6171257200,
  createdOn: (0, _moment["default"])().format('MMMM Do YYYY, h:mm:ss a'),
  owner: 2,
  type: 'current',
  status: 'inactive',
  balance: 10000
}, {
  id: 3,
  accountNumber: 6171257244,
  createdOn: (0, _moment["default"])().format('MMMM Do YYYY, h:mm:ss a'),
  owner: 3,
  type: 'savings',
  status: 'inactive',
  balance: 15000
}];
exports["default"] = _default;
//# sourceMappingURL=dummyAccounts.js.map