"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Users = require("../controllers/Users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/signup', _Users.signup);
router.post('/signin', _Users.login);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=Users.js.map