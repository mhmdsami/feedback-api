import { Elysia } from "elysia";

export const feedbackController = new Elysia({
  prefix: "/feedback",
  name: "feedback",
});
