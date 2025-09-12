"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.get("/gallery", (req, res) => {
    const resizedDir = path_1.default.resolve("assets/resized");
    if (!fs_1.default.existsSync(resizedDir)) {
        return res.json([]);
    }
    const files = fs_1.default.readdirSync(resizedDir).map((f) => "/assets/resized/" + f);
    console.log(`[GALLERY] Returning ${files.length} thumbnails`);
    res.json(files);
});
exports.default = router;
//# sourceMappingURL=gallery.js.map