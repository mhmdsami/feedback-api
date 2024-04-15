import { timestamp, integer, pgTable, uuid, text } from "drizzle-orm/pg-core";
import { event } from "./event";

export const feedback = pgTable("feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  comment: text("comment").notNull(),
  rating: integer("rating").notNull(),
  eventSlug: text("event_slug")
    .notNull()
    .references(() => event.slug),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
