import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/gallery", (req: express.Request, res: express.Response): void => {
  const resizedDir: string = path.resolve("assets/resized");

  if (!fs.existsSync(resizedDir)) {
    res.json([]);
    return;
  }

  const files: string[] = fs
    .readdirSync(resizedDir)
    .map((f: string) => "/assets/resized/" + f);

  console.log(`[GALLERY] Returning ${files.length} thumbnails`);
  res.json(files);
});

export default router;
