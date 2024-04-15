import { Elysia } from "elysia";
import { feedbackController } from "./feedback";
import { adminController } from "./admin";

export const api = new Elysia({
  prefix: "/api",
  name: "api",
})
  .use(feedbackController)
  .use(adminController);
