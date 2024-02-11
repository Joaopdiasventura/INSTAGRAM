import { FastifyInstance } from "fastify";
import post from "./post/post";
import Get from "./post/get";
import Delete from "./post/delete";

export default async function Post(app: FastifyInstance): Promise<void> {
  app.register(post);

  app.register(Get);

  app.register(Delete);
}