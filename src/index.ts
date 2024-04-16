import { Elysia } from "elysia";
import { api } from "@/controllers";
import { PORT } from "@/utils/config";

export const app = new Elysia()
  .get("/", () => {
    return {
      message: "Welcome to the Feedback API!",
    };
  })
  .get("/healthcheck", () => {
    return {
      status: "ok",
      uptime: process.uptime(),
    };
  })
  .onError(({ code, error }) => {
    switch (code) {
      case "NOT_FOUND": {
        return Response.json(
          {
            message: "The requested resource was not found",
          },
          { status: 404 },
        );
      }
      case "VALIDATION": {
        return Response.json(
          {
            message: "Validation error",
            errors: error.validator.Errors(error.value).First().schema.error,
          },
          { status: 400 },
        );
      }
      default:
        Response.json(
          {
            message: "Internal Server Error",
          },
          { status: 500 },
        );
    }
  })
  .use(api)
  .listen(PORT);

console.log(
  `App running at http://${app.server?.hostname}:${app.server?.port}`,
);
