import { Elysia } from "elysia";
import { api } from "./controllers";

export const app = new Elysia()
  .get("/", () => "Hello World!")
  .get("/healthcheck", () => {
    return {
      status: "ok",
      uptime: process.uptime(),
    };
  })
  .use(api)
  .listen(3000);

console.log(
  `App running at http://${app.server?.hostname}:${app.server?.port}`,
);
