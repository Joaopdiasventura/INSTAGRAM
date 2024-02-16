import { FastifyInstance } from "fastify";
import { CommentPostController } from "../../controllers/Comment/commentPostController/commentPost";
import { CommentPostParams } from "../../controllers/Comment/commentPostController/protocols";
import { CommentPostRepository } from "../../repositories/Comment/messagePostRepository/messagePost";

async function Post(app: FastifyInstance) {
  app.post("/comment", async (request, reply) => {
    const Body = request.body as CommentPostParams;

    const commentPostRepository = new CommentPostRepository();
    const commentPostController = new CommentPostController(
      commentPostRepository
    );

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