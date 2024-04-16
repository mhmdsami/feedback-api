import { app } from "@/index";
import { describe, expect, it } from "bun:test";

describe("API", () => {
  it("return a response", async () => {
    const response = await app.handle(new Request("http://localhost/"));
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toEqual({
      message: "Welcome to the Feedback API!",
    });
  });

  it("health is ok", async () => {
    const response = await app.handle(
      new Request("http://localhost/healthcheck"),
    );
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toEqual({
      status: "ok",
      uptime: expect.any(Number),
    });
  });

  it("return 404", async () => {
    const response = await app.handle(new Request("http://localhost/unknown"));
    expect(response.status).toBe(404);

    const body = await response.json();
    expect(body).toEqual({
      message: "The requested resource was not found",
    });
  });
});
