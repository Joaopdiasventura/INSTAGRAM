import { FastifyInstance } from "fastify";
import Post from "./follow/post";
import Get from "./follow/get";

export default async function (app: FastifyInstance): Promise<void> {
  app.register(Post);

  app.register(Get);
}