import { Elysia, t } from "elysia";
import { feedback, event } from "@/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { API_KEY } from "@/utils/config";

export const adminController = new Elysia({
  prefix: "/admin",
  name: "admin",
})
  .onBeforeHandle(({ headers }) => {
    if (headers["api_key"] !== API_KEY) {
      return Response.json(
        {
          message: "You are not authorized to access this resource.",
        },
        { status: 401 },
      );
    }
  })
  .post(
    "/create-event",
    async ({ body }) => {
      const exists = (
        await db.select().from(event).where(eq(event.slug, body.slug))
      ).length;
      if (exists) {
        return Response.json(
          {
            message: "Event with this slug already exists",
          },
          { status: 409 },
        );
      }

      const [res] = await db.insert(event).values(body).returning();

      if (res) {
        return Response.json(
          {
            message: "Event created successfully!",
            data: res,
          },
          { status: 201 },
        );
      }

      return Response.json(
        {
          message: "Failed to create event",
        },
        { status: 500 },
      );
    },
    {
      body: t.Object({
        name: t.String({
          minLength: 1,
          maxLength: 100,
          error: "name must be between 1 and 100 characters",
        }),
        description: t.String({
          minLength: 1,
          maxLength: 500,
          error: "description must be between 1 and 500 characters",
        }),
        slug: t.String({
          minLength: 1,
          maxLength: 100,
          error: "slug must be between 1 and 100 characters",
        }),
      }),
    },
  )
  .delete(
    "/delete-event",
    async ({ query: { slug } }) => {
      const res = await db.delete(event).where(eq(event.slug, slug));

      if (res) {
        return Response.json(
          {
            message: "Event deleted successfully!",
          },
          { status: 200 },
        );
      }

      return Response.json(
        {
          message: "Failed to delete event",
        },
        { status: 500 },
      );
    },
    {
      query: t.Object({
        slug: t.String({
          minLength: 1,
          maxLength: 100,
          error: "slug must be between 1 and 100 characters",
        }),
      }),
    },
  )
  .get(
    "/feedback",
    async ({ query: { slug } }) => {
      const feedbacks = await db
        .select()
        .from(feedback)
        .where(eq(feedback.eventSlug, slug));

      return {
        message: "Feedbacks retrieved successfully!",
        data: feedbacks,
      };
    },
    {
      query: t.Object({
        slug: t.String({
          minLength: 1,
          maxLength: 100,
          error: "slug must be between 1 and 100 characters",
        }),
      }),
    },
  );
