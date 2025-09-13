import path from "path";
import sharp from "sharp";
import fs from "fs";

const fileExtensions: string[] = [".jpg", ".jpeg", ".png"];

//Check if a file exists with one of the supported extensions.

function checkFile(fileName: string): string | null {
  for (const extension of fileExtensions) {
    const file: string = path.resolve("assets", fileName + extension);
    if (fs.existsSync(file)) {
      return file;
    }
  }
  return null;
}

//Resize an image (and optionally apply grayscale).
//Returns the path of the processed image.
async function processImage(
  filePath: string,
  filename: string,
  width: number,
  height: number,
  blackAndWhiteEffect: boolean
): Promise<string> {
  const extension: string = path.extname(filePath);
  const blackAndWhiteFlag: string = blackAndWhiteEffect ? "_bw" : "";
  const resizedFilePath: string = path.resolve(
    "assets",
    "resized",
    `${filename}_resized_${width}x${height}${blackAndWhiteFlag}${extension}`
  );

  fs.mkdirSync(path.dirname(resizedFilePath), { recursive: true });

  if (fs.existsSync(resizedFilePath)) {
    console.log(`[CACHE HIT] Serving cached image: ${resizedFilePath}`);
    return resizedFilePath;
  }

  let transformer: sharp.Sharp = sharp(filePath).resize(width, height);
  if (blackAndWhiteEffect) {
    transformer = transformer.grayscale();
    console.log(
      `[PROCESSED] Created new black & white image: ${resizedFilePath}`
    );
  } else {
    console.log(`[PROCESSED] Created new image: ${resizedFilePath}`);
  }

  await transformer.toFile(resizedFilePath);
  return resizedFilePath;
}

export { checkFile, processImage };
