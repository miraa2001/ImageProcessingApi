"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFile = checkFile;
exports.processImage = processImage;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
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
async function processImage(
  filePath,
  filename,
  width,
  height,
  blackAndWhiteEffect
) {
  const extension = path_1.default.extname(filePath);
  const blackAndWhiteFlag = blackAndWhiteEffect ? "_bw" : "";
  const resizedFilePath = path_1.default.resolve(
    "assets",
    "resized",
    `${filename}_resized_${width}x${height}${blackAndWhiteFlag}${extension}`
  );
  fs_1.default.mkdirSync(path_1.default.dirname(resizedFilePath), {
    recursive: true,
  });
  if (fs_1.default.existsSync(resizedFilePath)) {
    console.log(`[CACHE HIT] Serving cached image: ${resizedFilePath}`);
    return resizedFilePath;
  }
  if (blackAndWhiteEffect) {
    await (0, sharp_1.default)(filePath)
      .resize(width, height)
      .grayscale()
      .toFile(resizedFilePath);
    console.log(
      `[PROCESSED] Created new black & white image: ${resizedFilePath}`
    );
  } else {
    await (0, sharp_1.default)(filePath)
      .resize(width, height)
      .toFile(resizedFilePath);
    console.log(`[PROCESSED] Created new image: ${resizedFilePath}`);
  }
  return resizedFilePath;
}
//# sourceMappingURL=imageProcessor.js.map
