import { FastifyInstance } from "fastify";
import { GetLikesParams } from "../../controllers/Like/getLikesController/protocols";
import { GetLikesController } from "../../controllers/Like/getLikesController/getLikes";
import { GetLikesRepository } from "../../repositories/Like/getLikesRepository/getLikes";

async function Get(app: FastifyInstance) {
  app.get("/like/:post", async (request, reply) => {
    const Params = request.params as GetLikesParams;

    const getLikesRepository = new GetLikesRepository();
    const getLikesController = new GetLikesController(getLikesRepository);

    try {
      const { body, statusCode } = await getLikesController.handle({
        params: Params,
      });

      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
}

export default Get;