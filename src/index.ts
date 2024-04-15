import { Elysia } from "elysia";

export const app = new Elysia().get("/", () => "Hello World!").listen(3000);

console.log(
  `App running at http://${app.server?.hostname}:${app.server?.port}`,
);
