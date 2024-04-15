import { date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  comment: text("comment").notNull(),
  rating: integer("rating").notNull(),
  createdAt: date("created_at").notNull().default("now()"),
});
