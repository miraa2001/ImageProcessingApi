"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../middleware/middleware"));
const imageProcessor_1 = require("../utilities/imageProcessor");
const router = express_1.default.Router();
router.get("/resize", middleware_1.default, async (req, res) => {
  try {
    const filename = req.query.filename?.trim();
    const widthStr = req.query.width;
    const heightStr = req.query.height;
    const blackAndWhiteEffect = req.query.bw === "true";
    // Validate filename
    if (!filename) {
      res.status(400).send("Error: 'filename' query parameter is required.");
      return;
    }
    // Validate presence of width and height
    if (!widthStr || !heightStr) {
      res
        .status(400)
        .send(
          "Error: Both 'width' and 'height' query parameters are required."
        );
      return;
    }
    // Allow optional leading minus sign, then validate positivity later
    if (!/^-?\d+$/.test(widthStr) || !/^-?\d+$/.test(heightStr)) {
      res
        .status(400)
        .send(
          "Error: 'width' and 'height' must be whole numbers without letters or symbols."
        );
      return;
    }
    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);
    // Validate positive integers
    if (width <= 0 || height <= 0) {
      res
        .status(400)
        .send(
          "Error: 'width' and 'height' must be positive integers greater than 0."
        );
      return;
    }
    // Check if file exists
    const filePath = (0, imageProcessor_1.checkFile)(filename);
    if (!filePath) {
      res
        .status(404)
        .send(
          `Error: No file found for base name '${filename}'. Please check the filename.`
        );
      return;
    }
    // Process image
    const resizedFilePath = await (0, imageProcessor_1.processImage)(
      filePath,
      filename,
      width,
      height,
      blackAndWhiteEffect
    );
    res.status(200).sendFile(resizedFilePath);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing image.");
    return;
  }
});
exports.default = router;
//# sourceMappingURL=resize.js.map
