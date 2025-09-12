"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./utilities/router"));
const app = (0, express_1.default)();
const port = 3000;
app.use("/", router_1.default);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map
