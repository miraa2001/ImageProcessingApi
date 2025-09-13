import express from "express";
import middleware from "../middleware/middleware";
import { checkFile, processImage } from "../utilities/imageProcessor";

const router = express.Router();

router.get(
  "/resize",
  middleware,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const filename: string = (req.query.filename as string)?.trim();
      const widthStr = req.query.width as string;
      const heightStr = req.query.height as string;
      const blackAndWhiteEffect: boolean = (req.query.bw as string) === "true";

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
      const filePath = checkFile(filename);
      if (!filePath) {
        res
          .status(404)
          .send(
            `Error: No file found for base name '${filename}'. Please check the filename.`
          );
        return;
      }

      // Process image
      const resizedFilePath = await processImage(
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
  }
);

export default router;
