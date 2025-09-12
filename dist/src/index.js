"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const resize_1 = __importDefault(require("./routes/resize"));
const upload_1 = __importDefault(require("./routes/upload"));
const gallery_1 = __importDefault(require("./routes/gallery"));
const app = (0, express_1.default)();
const port = 3000;
// serve frontend
app.use(express_1.default.static(path_1.default.resolve(process.cwd(), "frontend")));
// serve assets so <img src="/assets/..."> works
app.use("/assets", express_1.default.static(path_1.default.resolve("assets")));
// API routes
app.use("/", resize_1.default);
app.use("/", upload_1.default);
app.use("/", gallery_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map