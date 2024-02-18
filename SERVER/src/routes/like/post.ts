import { FastifyInstance } from "fastify";
import { LikePostParams } from "../../controllers/Like/likePostController/protocols";
import { LikePostController } from "../../controllers/Like/likePostController/likePost";
import { LikePostRepository } from "../../repositories/Like/likePostRepository/likePost";
import { text } from "../../middlewares";

async function Post(app: FastifyInstance) {
  app.post("/like", async (request, reply) => {
    const Body = request.body as LikePostParams;

    const likePostRepository = new LikePostRepository();
    const likePostController = new LikePostController(likePostRepository);
    
    const fields = ["email", "post"];
    const validation = text(Body, fields);

    if (validation) {
      reply.status(validation.statusCode).send(validation.body);
      return;
    }
    
    try {
      const { body, statusCode } = await likePostController.handle({
        body: Body,
      });

      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
}

export default Post;