"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const middleware_1 = __importDefault(require("../middleware/middleware"));
const router = express_1.default.Router();
const fileExtensions = [".jpg", ".jpeg", ".png"];
function checkFile(fileName) {
    for (const extension of fileExtensions) {
        const file = path_1.default.resolve("assets", fileName + extension);
        if (fs_1.default.existsSync(file)) {
            return file;
        }
    }
    return null;
}
router.get("/resize", middleware_1.default, async (req, res) => {
    try {
        const width = parseInt(req.query.width);
        const height = parseInt(req.query.height);
        const filename = req.query.filename;
        const blackAndWhiteEffect = req.query.bw === "true";
        if (!filename) {
            return res.status(400).send("Missing 'filename' query parameter");
        }
        if (isNaN(width) || isNaN(height)) {
            return res.status(400).send("Width and height must be numbers");
        }
        const filePath = checkFile(filename);
        if (!filePath) {
            return res
                .status(404)
                .send(`File not found or file type is not supported for base name: ${filename}`);
        }
        const extension = path_1.default.extname(filePath);
        const blackAndWhiteFlag = (blackAndWhiteEffect ? "_bw" : "");
        const resizedFilePath = path_1.default.resolve("assets", "resized", `${filename}_resized_${width}x${height}${blackAndWhiteFlag}${extension}`);
        fs_1.default.mkdirSync(path_1.default.dirname(resizedFilePath), { recursive: true });
        if (fs_1.default.existsSync(resizedFilePath)) {
            console.log(`[CACHE HIT] Serving cached image: ${resizedFilePath}`);
            return res.sendFile(resizedFilePath);
        }
        if (blackAndWhiteEffect) {
            await (0, sharp_1.default)(filePath)
                .resize(width, height)
                .grayscale()
                .toFile(resizedFilePath);
            console.log(`[PROCESSED] Created new black & white image: ${resizedFilePath}`);
        }
        else {
            await (0, sharp_1.default)(filePath).resize(width, height).toFile(resizedFilePath);
            console.log(`[PROCESSED] Created new image: ${resizedFilePath}`);
        }
        return res.status(200).sendFile(resizedFilePath);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Error processing image");
    }
});
exports.default = router;
//# sourceMappingURL=router.js.map