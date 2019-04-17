"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = exports.findUser = exports.addUser = void 0;

var _bcrypt = require("bcrypt");

var _dummyUsers = _interopRequireDefault(require("../utils/dummyUsers"));

var _validate = require("../helpers/validate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addUser = function addUser(user) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var id, result, hashPassword;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              id = {
                id: _dummyUsers["default"].length + 1
              };
              _context.next = 4;
              return _validate.checkSignup.validate(_objectSpread({}, id, user));

            case 4:
              result = _context.sent;
              _context.next = 7;
              return (0, _bcrypt.hash)(result.password, (0, _bcrypt.genSaltSync)(10));

            case 7:
              hashPassword = _context.sent;
              result.password = hashPassword;

              _dummyUsers["default"].push(result);

              resolve(result);
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 13]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.addUser = addUser;

var findUser = function findUser(param) {
  var user = _dummyUsers["default"].find(function (item) {
    return item.email === param.email || item.id === param.id;
  });

  return user;
};

exports.findUser = findUser;

var loginUser = function loginUser(data) {
  return new Promise(function (resolve, reject) {
    _validate.checkLogin.validate(data).then(function (result) {
      var user = findUser(result);
      resolve(user);
    })["catch"](function (error) {
      return reject(error);
    });
  });
};

exports.loginUser = loginUser;
//# sourceMappingURL=Users.js.map