import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.resolve("assets")),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  console.log(`[UPLOAD] New image: ${req.file.filename}`);
  // redirect to gallery after upload
  res.redirect("/index.html");
});

export default router;
