"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _dummyTransactions = _interopRequireDefault(require("../utils/dummyTransactions"));

var _validate = require("../helpers/validate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(transaction, accountNumber) {
  return new Promise(function (resolve, reject) {
    var id = {
      id: _dummyTransactions["default"].length + 1
    };
    var createdOn = {
      createdOn: (0, _moment["default"])().format('MMMM Do YYYY, h:mm:ss a')
    };

    _validate.checkTransaction.validate(_objectSpread({}, id, accountNumber, createdOn, transaction)).then(function (result) {
      _dummyTransactions["default"].push(result);

      resolve(result);
    })["catch"](function (error) {
      return reject(error);
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=Transactions.js.map