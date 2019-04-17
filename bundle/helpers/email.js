"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notification = exports.signup = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _capitalize = _interopRequireDefault(require("./capitalize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var transport = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
};

var signup =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var firstName, lastName, email, transporter, mailOptions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            firstName = _ref.firstName, lastName = _ref.lastName, email = _ref.email;
            _context.next = 3;
            return _nodemailer["default"].createTransport(transport);

          case 3:
            transporter = _context.sent;
            mailOptions = {
              from: '"Banka inc" <foo@example.com>',
              // sender address
              to: email,
              // list of receivers
              subject: 'Welcome to Banka',
              // Subject line
              html: "<h1>".concat((0, _capitalize["default"])(firstName), " ").concat((0, _capitalize["default"])(lastName), "</h1>\n    <p>You just successfully registered with Banka</p>\n    <p>Go back to the <a href=\"https://iykeevans.github.io/banka/UI\">Website</a> to sign in</p>\n    ") // html body

            };
            return _context.abrupt("return", transporter.sendMail(mailOptions));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signup(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signup = signup;

var notification =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(transaction) {
    var transporter, mailOptions;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _nodemailer["default"].createTransport(transport);

          case 2:
            transporter = _context2.sent;
            mailOptions = {
              from: '"Banka inc" <foo@example.com>',
              // sender address
              to: 'krest.swiss@gmail.com',
              // list of receivers
              subject: 'Banka Transaction Notification Services (Banka ALERT)',
              // Subject line
              html: "<p>This is to inform you that a transaction has occurred on your account with Banka with details below</p>\n      <table style=\"font-family: arial, sans-serif; border-collapse: collapse; width: 100%;\">\n      <tr>\n        <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">Transaction Type</td>\n        <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">".concat(transaction.type.toUpperCase(), " ALERT</td>\n      </tr>\n      <tr>\n        <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">Amount</td>\n        <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(transaction.amount, "</td>\n      </tr>\n      <tr>\n        <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">Account Number</td>\n        <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(transaction.accountNumber, "</td>\n      </tr>\n      <tr>\n        <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">Date and Time</td>\n        <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(transaction.createdOn, "</td>\n      </tr>\n      <tr>\n        <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">Old Balance</td>\n        <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(transaction.oldBalance, "</td>\n      </tr>\n      <tr>\n        <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">New Balance</td>\n        <td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(transaction.newBalance, "</td>\n      </tr>\n    </table>\n    ") // html body

            };
            return _context2.abrupt("return", transporter.sendMail(mailOptions));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function notification(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.notification = notification;
//# sourceMappingURL=email.js.map