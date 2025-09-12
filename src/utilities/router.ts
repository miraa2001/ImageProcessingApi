import express from "express";
import path from "path";
import sharp from "sharp";
import middleware from "../middleware/middleware";
const router = express.Router();
router.get(
  "/resize",
  middleware,
  async (req: express.Request, res: express.Response) => {
    try {
      const width: number = parseInt(req.query.width as unknown as string);
      const height: number = parseInt(req.query.height as unknown as string);
      const filename = req.query.filename;
      const filePath = path.resolve("assets/" + filename);
      const resizedFilePath = path.resolve("assets", "resized", `${filename}`);
      if (!filename) {
        return res.status(400).send("Missing 'filename' query parameter");
      }
      if (isNaN(width) || isNaN(height)) {
        return res.status(400).send("Width and height must be numbers");
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
