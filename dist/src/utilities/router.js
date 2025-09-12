"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const router = express_1.default.Router();
router.get("/resize", async (req, res) => {
  try {
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const filename = req.query.filename;
    const filePath = path_1.default.resolve("assets/" + filename);
    const resizedFilePath = path_1.default.resolve(
      "assets",
      "resized",
      `${filename}_resized.jpg`
    );
    if (!filename) {
      return res.status(400).send("Missing 'filename' query parameter");
    }
    if (isNaN(width) || isNaN(height)) {
      return res.status(400).send("Width and height must be numbers");
    }
    await (0, sharp_1.default)(filePath)
      .resize(width, height)
      .toFile(resizedFilePath);
    return res.status(200).sendFile(resizedFilePath);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error processing image");
  }
});
exports.default = router;
//# sourceMappingURL=router.js.map
