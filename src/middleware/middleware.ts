import express from "express";
const middleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Your Image is being processed");
  next();
};
export default middleware;
