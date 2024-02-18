import { FastifyInstance } from "fastify";
import { CommentPostController } from "../../controllers/Message/messagePostController/messagePost";
import { CommentPostParams } from "../../controllers/Message/messagePostController/protocols";
import { CommentPostRepository } from "../../repositories/Message/messagePostRepository/messagePost";
import { text } from "../../middlewares";

async function Post(app: FastifyInstance) {
  app.post("/comment", async (request, reply) => {
    const Body = request.body as CommentPostParams;

    const commentPostRepository = new CommentPostRepository();
    const commentPostController = new CommentPostController(
      commentPostRepository
    );
 
    const fields = ["content", "email", "post"];
    const validation = text(Body, fields);

    if (validation) {
      reply.status(validation.statusCode).send(validation.body);
      return;
    }

    try {
      const { body, statusCode } = await commentPostController.handle({
        body: Body,
      });

      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
}

export default Post;
