"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Accounts = require("../controllers/Accounts");

var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _verifyToken["default"], _Accounts.createAccount);
router["delete"]('/:accountNumber', _verifyToken["default"], _Accounts.deleteAccount);
router.patch('/:accountNumber', _verifyToken["default"], _Accounts.changeStatus);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=Accounts.js.map