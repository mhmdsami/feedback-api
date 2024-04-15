import { Elysia } from "elysia";
import { api } from "./controllers";
import { PORT } from "../utils/config";

export const app = new Elysia()
  .get("/", () => "Hello World!")
  .get("/healthcheck", () => {
    return {
      status: "ok",
      uptime: process.uptime(),
    };
  })
  .use(api)
  .listen(PORT);

console.log(
  `App running at http://${app.server?.hostname}:${app.server?.port}`,
);
