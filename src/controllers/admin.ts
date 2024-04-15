import { Elysia } from "elysia";

export const adminController = new Elysia({
  prefix: "/admin",
  name: "admin",
});
