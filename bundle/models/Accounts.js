"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editStatus = exports.removeAccount = exports.addAccount = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _dummyAccounts = _interopRequireDefault(require("../utils/dummyAccounts"));

var _validate = require("../helpers/validate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addAccount = function addAccount(account) {
  return new Promise(function (resolve, reject) {
    var id = {
      id: _dummyAccounts["default"].length + 1
    };
    var createdOn = {
      createdOn: (0, _moment["default"])().format('MMMM Do YYYY, h:mm:ss a')
    };

    _validate.checkAccount.validate(_objectSpread({}, id, createdOn, account)).then(function (result) {
      _dummyAccounts["default"].push(result);

      resolve(result);
    })["catch"](function (error) {
      return reject(error);
    });
  });
};

exports.addAccount = addAccount;

var removeAccount = function removeAccount(_ref) {
  var accountNumber = _ref.accountNumber;
  return new Promise(function (resolve, reject) {
    var account = _dummyAccounts["default"].findIndex(function (item) {
      return item.accountNumber === Number(accountNumber);
    });

    if (account !== -1) {
      var data = _dummyAccounts["default"][account];

      _dummyAccounts["default"].splice(account, 1);

      resolve(data);
    } else {
      reject(new Error('Account doesn\'t exist'));
    }
  });
};

exports.removeAccount = removeAccount;

var editStatus = function editStatus(_ref2) {
  var params = _ref2.params,
      body = _ref2.body;
  return new Promise(function (resolve, reject) {
    _validate.checkStatus.validate(_objectSpread({}, params, body)).then(function (result) {
      // console.log(result)
      var account = _dummyAccounts["default"].findIndex(function (item) {
        return item.accountNumber === result.accountNumber;
      });

      if (account !== -1) {
        var data = _dummyAccounts["default"][account];
        data.status = result.status;
        resolve(data);
      } else {
        reject(new Error('Account doesn\'t exist'));
      }
    })["catch"](function (error) {
      return reject(error);
    });
  });
};

exports.editStatus = editStatus;
//# sourceMappingURL=Accounts.js.map