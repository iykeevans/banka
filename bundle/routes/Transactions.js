"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Transactions = _interopRequireDefault(require("../controllers/Transactions"));

var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/:accountNumber/debit', _verifyToken["default"], _Transactions["default"]);
router.post('/:accountNumber/credit', _verifyToken["default"], _Transactions["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=Transactions.js.map