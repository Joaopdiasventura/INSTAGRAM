import { FastifyInstance } from "fastify";
import Post from "./comment/post";
import Get from "./comment/get";
import Delete from "./comment/delete";

async function Comment(app: FastifyInstance): Promise<void> {
  app.register(Post);

  app.register(Get);

  app.register(Delete);
}

export default Comment;