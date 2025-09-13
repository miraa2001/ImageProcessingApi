import path from "path";
import fs from "fs";
import sharp from "sharp";
import { processImage, checkFile } from "../utilities/imageProcessor";

describe("Image Processing Utility Function", () => {
  const testFileName = "google"; // assumes assets/test.jpg or .png exists
  const width = 120;
  const height = 60;
  const bw = false;

  it("should process and create a resized image with valid inputs", async () => {
    const filePath = checkFile(testFileName);
    expect(filePath).not.toBeNull();

    if (filePath) {
      const resizedFilePath = await processImage(
        filePath,
        testFileName,
        width,
        height,
        bw
      );

      expect(fs.existsSync(resizedFilePath)).toBeTrue();
    }
  });

  it("should process and create a black & white image when bw=true", async () => {
    const filePath = checkFile(testFileName);
    expect(filePath).not.toBeNull();

    if (filePath) {
      const resizedFilePath = await processImage(
        filePath,
        testFileName,
        width,
        height,
        true // bw enabled
      );

      expect(fs.existsSync(resizedFilePath)).toBeTrue();
      expect(resizedFilePath).toContain("_bw");
    }
  });

  it("should throw an error when given an invalid file path", async () => {
    const badFilePath = path.resolve("assets", "notfound.jpg");

    await expectAsync(
      processImage(badFilePath, "notfound", width, height, bw)
    ).toBeRejected();
  });

  it("should produce an image with the correct dimensions", async () => {
    const filePath = checkFile(testFileName);
    expect(filePath).not.toBeNull();

    if (filePath) {
      const resizedFilePath = await processImage(
        filePath,
        testFileName,
        width,
        height,
        bw
      );

      const testFileMetadata = await sharp(resizedFilePath).metadata();

      expect(testFileMetadata.width).toBe(width);
      expect(testFileMetadata.height).toBe(height);
    }
  });
});
