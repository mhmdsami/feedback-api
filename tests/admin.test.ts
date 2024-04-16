import { app } from "@/index";
import { API_KEY } from "@/utils/config";
import { describe, expect, it } from "bun:test";

const mockEvent = {
  name: "Event Name",
  description: "Event Description",
  slug: "event-slug",
};

describe("API", () => {
  it("create event without providing API_KEY", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/admin/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockEvent),
      }),
    );
    expect(response.status).toBe(401);

    const body = await response.json();
    expect(body.message).toBe(
      "You are not authorized to access this resource.",
    );
  });

  it("create event", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/admin/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_key: API_KEY,
        },
        body: JSON.stringify(mockEvent),
      }),
    );
    expect(response.status).toBe(201);

    const body = await response.json();
    expect(body.message).toBe("Event created successfully!");
    expect(body.data).toMatchObject(mockEvent);
  });

  it("create event with existing slug", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/admin/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_key: API_KEY,
        },
        body: JSON.stringify(mockEvent),
      }),
    );
    expect(response.status).toBe(409);

    const body = await response.json();
    expect(body.message).toBe("Event with this slug already exists");
  });

  it("delete event", async () => {
    const response = await app.handle(
      new Request(
        `http://localhost/api/admin/delete-event?slug=${mockEvent.slug}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            api_key: API_KEY,
          },
        },
      ),
    );
  });
});
