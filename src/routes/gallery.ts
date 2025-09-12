import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/gallery", (req, res) => {
  const resizedDir = path.resolve("assets/resized");
  if (!fs.existsSync(resizedDir)) {
    return res.json([]);
  }

  const files = fs.readdirSync(resizedDir).map(f => "/assets/resized/" + f);
  console.log(`[GALLERY] Returning ${files.length} thumbnails`);
  res.json(files);
});

export default router;
