"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const imageProcessor_1 = require("../utilities/imageProcessor");
describe("Image Processing Utility Function", () => {
  const testFileName = "google"; // assumes assets/test.jpg or .png exists
  const width = 120;
  const height = 60;
  const bw = false;
  it("should process and create a resized image with valid inputs", async () => {
    const filePath = (0, imageProcessor_1.checkFile)(testFileName);
    expect(filePath).not.toBeNull();
    if (filePath) {
      const resizedFilePath = await (0, imageProcessor_1.processImage)(
        filePath,
        testFileName,
        width,
        height,
        bw
      );
      expect(fs_1.default.existsSync(resizedFilePath)).toBeTrue();
    }
  });
  it("should process and create a black & white image when bw=true", async () => {
    const filePath = (0, imageProcessor_1.checkFile)(testFileName);
    expect(filePath).not.toBeNull();
    if (filePath) {
      const resizedFilePath = await (0, imageProcessor_1.processImage)(
        filePath,
        testFileName,
        width,
        height,
        true // bw enabled
      );
      expect(fs_1.default.existsSync(resizedFilePath)).toBeTrue();
      expect(resizedFilePath).toContain("_bw");
    }
  });
  it("should throw an error when given an invalid file path", async () => {
    const badFilePath = path_1.default.resolve("assets", "notfound.jpg");
    await expectAsync(
      (0, imageProcessor_1.processImage)(
        badFilePath,
        "notfound",
        width,
        height,
        bw
      )
    ).toBeRejected();
  });
  it("should produce an image with the correct dimensions", async () => {
    const filePath = (0, imageProcessor_1.checkFile)(testFileName);
    expect(filePath).not.toBeNull();
    if (filePath) {
      const resizedFilePath = await (0, imageProcessor_1.processImage)(
        filePath,
        testFileName,
        width,
        height,
        bw
      );
      const testFileMetadata = await (0, sharp_1.default)(
        resizedFilePath
      ).metadata();
      expect(testFileMetadata.width).toBe(width);
      expect(testFileMetadata.height).toBe(height);
    }
  });
});
//# sourceMappingURL=imageProcessingSpec.js.map
