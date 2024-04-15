import { z } from "zod";

const configSchema = z.object({
  PORT: z.string().default("3000"),
  DATABASE_URL: z
    .string()
    .default("postgres://postgres:postgres@localhost:5432/feedbackapi"),
  API_KEY: z.string(),
});

export const { PORT, DATABASE_URL, API_KEY } = configSchema.parse(Bun.env);
