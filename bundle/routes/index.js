"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Users = _interopRequireDefault(require("./Users"));

var _Accounts = _interopRequireDefault(require("./Accounts"));

var _Transactions = _interopRequireDefault(require("./Transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.all('/', function (req, res) {
  res.json({
    status: 200,
    message: 'Welcome to my Banka app'
  });
});
router.all('/api/v1', function (req, res) {
  res.json({
    status: 200,
    message: 'Welcome to my Banka API'
  });
});
router.use('/api/v1/auth', _Users["default"]);
router.use('/api/v1/accounts', _Accounts["default"]);
router.use('/api/v1/transactions', _Transactions["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map