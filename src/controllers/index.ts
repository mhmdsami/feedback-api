import { Elysia } from "elysia";
import { feedbackController } from "./feedback";
import { adminController } from "./admin";

export const api = new Elysia().use(feedbackController).use(adminController);
