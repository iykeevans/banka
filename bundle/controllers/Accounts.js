"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeStatus = exports.deleteAccount = exports.createAccount = void 0;

var _Accounts = require("../models/Accounts");

var _Users = require("../models/Users");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createAccount =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var owner, account, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            owner = {
              owner: req.user.id
            };
            _context.next = 4;
            return (0, _Accounts.addAccount)(_objectSpread({}, owner, req.body));

          case 4:
            account = _context.sent;
            user = (0, _Users.findUser)({
              id: req.user.id
            });
            res.status(201).json({
              status: 201,
              data: {
                accountNumber: account.accountNumber,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                type: account.type,
                openingBalance: account.balance
              }
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              status: 500,
              error: _context.t0.message
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function createAccount(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createAccount = createAccount;

var deleteAccount =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _Accounts.removeAccount)(req.params);

          case 3:
            res.json({
              status: 200,
              message: 'Account successfully deleted'
            });
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              status: 500,
              error: _context2.t0.message
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function deleteAccount(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteAccount = deleteAccount;

var changeStatus =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _ref4, accountNumber, status;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _Accounts.editStatus)(req);

          case 3:
            _ref4 = _context3.sent;
            accountNumber = _ref4.accountNumber;
            status = _ref4.status;
            res.json({
              status: 200,
              data: {
                accountNumber: accountNumber,
                status: status
              }
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              status: 500,
              error: _context3.t0.message
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function changeStatus(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.changeStatus = changeStatus;
//# sourceMappingURL=Accounts.js.map