"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware = (req, res, next) => {
  console.log("Your Image is being processed");
  next();
};
exports.default = middleware;
//# sourceMappingURL=middleware.js.map
