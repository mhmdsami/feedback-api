CREATE TABLE IF NOT EXISTS "feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"rating" integer NOT NULL,
	"created_at" date DEFAULT 'now()' NOT NULL
);
