import express, { Application } from "express";
import path from "path";
import resizeRouter from "./routes/resize";
import uploadRouter from "./routes/upload";
import galleryRouter from "./routes/gallery";

const app: Application = express();
const port: number = 3000;

// serve frontend
app.use(express.static(path.resolve(process.cwd(), "frontend")));

// serve static assets
app.use("/assets", express.static(path.resolve("assets")));

// API routes
app.use("/", resizeRouter);
app.use("/", uploadRouter);
app.use("/", galleryRouter);

app.listen(port, (): void => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
