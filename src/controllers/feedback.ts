import { event, feedback } from "@/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";

export const feedbackController = new Elysia({
  prefix: "/feedback",
  name: "feedback",
}).post(
  "/",
  async ({ body, query: { slug } }) => {
    const eventExists = (
      await db.select().from(event).where(eq(event.slug, slug))
    ).length;

    if (!eventExists) {
      return Response.json(
        {
          message: "Event not found",
        },
        { status: 404 },
      );
    }

    const res = await db
      .insert(feedback)
      .values({ ...body, eventSlug: slug })
      .returning();

    if (res) {
      return Response.json(
        {
          message: "Feedback added successfully!",
          feedback: res,
        },
        { status: 201 },
      );
    }

    return Response.json(
      {
        message: "Failed to add feedback",
      },
      { status: 500 },
    );
  },
  {
    body: t.Object({
      comment: t.String({
        minLength: 1,
        maxLength: 500,
        error: "comment must be between 1 and 500 characters",
      }),
      rating: t.Integer({
        minimum: 1,
        maximum: 5,
        error: "rating must be between 1 and 5",
      }),
    }),
    query: t.Object({
      slug: t.String({
        minLength: 1,
        maxLength: 100,
        error: "slug must be between 1 and 100 characters",
      }),
    }),
  },
);
