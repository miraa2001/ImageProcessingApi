import express from "express";
import multer, { StorageEngine } from "multer";
import path from "path";

const router = express.Router();

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb): void => {
    cb(null, path.resolve("assets"));
  },
  filename: (req, file, cb): void => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.single("image"),
  (req: express.Request, res: express.Response): void => {
    if (!req.file) {
      res.status(400).send("No file uploaded");
      return;
    }

    console.log(`[UPLOAD] New image: ${req.file.filename}`);
    res.redirect("/index.html");
  }
);

export default router;
