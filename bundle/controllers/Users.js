"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.signup = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Users = require("../models/Users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// const { signup } = require('../helpers/email');
var signup =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var user, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _Users.addUser)(req.body);

          case 3:
            user = _context.sent;
            _context.next = 6;
            return _jsonwebtoken["default"].sign({
              id: user.id,
              email: user.email
            }, process.env.SECRET, {
              expiresIn: '1h'
            });

          case 6:
            token = _context.sent;
            // await signup({ firstName, lastName, email });
            res.status(201).json({
              status: 201,
              data: {
                token: token,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
              }
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              status: 500,
              error: _context.t0.message
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signup = signup;

var login =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var user, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _Users.loginUser)(req.body);

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 8;
              break;
            }

            res.status(400).json({
              status: 400,
              error: 'bad request'
            });
            _context2.next = 12;
            break;

          case 8:
            _context2.next = 10;
            return _jsonwebtoken["default"].sign({
              id: user.id,
              email: user.email
            }, process.env.SECRET, {
              expiresIn: '1h'
            });

          case 10:
            token = _context2.sent;
            res.json({
              status: 200,
              data: {
                token: token,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
              }
            });

          case 12:
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              status: 500,
              error: _context2.t0.message
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));

  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;
//# sourceMappingURL=Users.js.map