import { FastifyInstance } from "fastify";
import Post from "./like/post";
import Get from "./like/get";

export default async function Like(app: FastifyInstance): Promise<void> {
  app.register(Post);

  app.register(Get);
}