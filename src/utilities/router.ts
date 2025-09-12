import express from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import middleware from "../middleware/middleware";

const router = express.Router();

const fileExtensions = [".jpg", ".jpeg", ".png"];

function checkFile(fileName: string): string | null {
  for (const extension of fileExtensions) {
    const file = path.resolve("assets", fileName + extension);
    if (fs.existsSync(file)) {
      return file;
    }
  }
  return null;
}

router.get(
  "/resize",
  middleware,
  async (req: express.Request, res: express.Response) => {
    try {
      const width: number = parseInt(req.query.width as string);
      const height: number = parseInt(req.query.height as string);
      const filename: string = req.query.filename as string;

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
          .send(`File not found for base name: ${filename}`);
      }

      const extension = path.extname(filePath);
      const resizedFilePath = path.resolve(
        "assets",
        "resized",
        `${filename}_resized_${width}x${height}${extension}`
      );

      fs.mkdirSync(path.dirname(resizedFilePath), { recursive: true });

      if (fs.existsSync(resizedFilePath)) {
        return res.sendFile(resizedFilePath);
      }

      await sharp(filePath).resize(width, height).toFile(resizedFilePath);

      return res.status(200).sendFile(resizedFilePath);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error processing image");
    }
  }
);

export default router;
