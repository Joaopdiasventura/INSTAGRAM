import { FastifyInstance } from "fastify";
import Post from "./message/post";
import Get from "./message/get";
import Delete from "./message/delete";

async function Message(app: FastifyInstance): Promise<void> {
  app.register(Post);

  app.register(Get);

  app.register(Delete);
}

export default Message;