import request from "supertest";
import app from "../index"; // make sure index.ts exports `app`

describe("Image Processing API /resize endpoint", () => {
  it("should return 400 if no query parameters are provided", async () => {
    const res = await request(app).get("/resize");
    expect(res.status).toBe(400);
    expect(res.text).toContain("Missing 'filename'");
  });

  it("should return 400 if wrong query parameters are provided", async () => {
    const res = await request(app).get(
      "/resize?filename=test.jpg&width=width&height=200"
    );
    expect(res.status).toBe(400);
    expect(res.text).toContain("Width and height must be numbers");
  });

  it("should return 400 if unexisting file extension is provided", async () => {
    const res = await request(app).get(
      "/resize?filename=christmas&width=200&height=200"
    );
    expect(res.status).toBe(404);
    expect(res.text).toContain("File not found for base name: christmas");
  });

  it("should return 200 and an image when valid parameters are given", async () => {
    const res = await request(app).get(
      "/resize?filename=test&width=100&height=100"
    );
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/image/);
  });
});
