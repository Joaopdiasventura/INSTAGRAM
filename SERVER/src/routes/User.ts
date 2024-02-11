import { FastifyInstance } from "fastify";
import Login from "./user/login";
import Updates from "./user/update";
import Register from "./user/register";
import Get from "./user/get";

export default async function (app: FastifyInstance): Promise<void> {
  app.register(Register);

  app.register(Login);

  app.register(Updates);

  app.register(Get);
}