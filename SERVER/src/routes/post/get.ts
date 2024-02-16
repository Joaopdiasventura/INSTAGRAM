import { FastifyInstance } from "fastify";
import { GetPostsParams } from "../../controllers/Post/getPostsController/protocols";
import { GetPostsController } from "../../controllers/Post/getPostsController/getPosts";
import { GetPostsRepository } from "../../repositories/Post/getPostsRepository/getPosts";

async function Get(app: FastifyInstance) {
  app.get("/post/:email", async (request, reply) => {
    const Params = request.params as GetPostsParams;

    const getPostsRepository = new GetPostsRepository();
    const getPostsController = new GetPostsController(getPostsRepository);

    try {
      const { body, statusCode } = await getPostsController.handle({
        params: Params,
      });

      reply.status(statusCode).send(body);
    } catch (error) {
      reply.status(500).send(error);
    }
  });
}

export default Get;