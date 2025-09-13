import request from "supertest";
import app from "../index";

describe("Image Processing API /resize endpoint", () => {
  it("should return 400 if no query parameters are provided", async () => {
    const res = await request(app).get("/resize");
    expect(res.status).toBe(400);
    expect(res.text).toContain("'filename' query parameter is required");
  });

  it("should return 400 if width or height are missing", async () => {
    const res = await request(app).get("/resize?filename=test&width=200");
    expect(res.status).toBe(400);
    expect(res.text).toContain(
      "Both 'width' and 'height' query parameters are required"
    );
  });

  it("should return 400 if width or height contain non-numeric characters", async () => {
    const res = await request(app).get(
      "/resize?filename=test&width=200px&height=300"
    );
    expect(res.status).toBe(400);
    expect(res.text).toContain("'width' and 'height' must be whole numbers");
  });

  it("should return 400 if width or height are zero or negative", async () => {
    const res = await request(app).get(
      "/resize?filename=test&width=0&height=-100"
    );
    expect(res.status).toBe(400);
    expect(res.text).toContain(
      "'width' and 'height' must be positive integers"
    );
  });

  it("should return 404 if filename does not exist", async () => {
    const res = await request(app).get(
      "/resize?filename=notfound&width=200&height=200"
    );
    expect(res.status).toBe(404);
    expect(res.text).toContain("No file found for base name");
  });

  it("should return 200 and an image when valid parameters are given", async () => {
    const res = await request(app).get(
      "/resize?filename=test&width=100&height=100"
    );
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/image/);
  });
});
