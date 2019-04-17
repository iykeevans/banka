"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_routes["default"]);
app.listen(3000, function () {
  return console.log('now listening to port 3000');
});
module.exports = app;
//# sourceMappingURL=index.js.map