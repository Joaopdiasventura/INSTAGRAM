import { FastifyInstance } from "fastify";
import { CommentPostController } from "../../controllers/Comment/commentPostController/commentPost";
import { CommentPostParams } from "../../controllers/Comment/commentPostController/protocols";
import { CommentPostRepository } from "../../repositories/Comment/commentPostRepository/commentPost";
import IsAll from "../../middlewares/comment/post";

async function Post(app: FastifyInstance) {
  app.post("/comment", async (request, reply) => {
    const Body = request.body as CommentPostParams;

    const validation = IsAll(Body);

    if (validation) {
      reply.status(validation.statusCode).send(validation.body);
      return;
    }   

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