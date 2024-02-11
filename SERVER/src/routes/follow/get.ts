import { FastifyInstance } from "fastify";
import { GetFollowersController } from "../../controllers/Follow/getFollowersController/getFollowers";
import { GetFollowersParams } from "../../controllers/Follow/getFollowersController/protocols";
import { GetFollowingsController } from "../../controllers/Follow/getFollowingsController/getFollowings";
import { GetFollowersRepository } from "../../repositories/Follow/getFollowersRepository/getFollowers";
import { GetFollowingsRepository } from "../../repositories/Follow/getFollowingsRepository/getFollowings";

async function Get(app: FastifyInstance) {
  app.get("/follower/:email", async (request, reply) => {
    const Params = request.params as GetFollowersParams;

    const getFollowersRepository = new GetFollowersRepository();
    const getFollowersController = new GetFollowersController(
      getFollowersRepository
    );

    try {
      const { body, statusCode } = await getFollowersController.handle({
        params: Params,
      });
      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  app.get("/following/:email", async (request, reply) => {
    const Params = request.params as GetFollowersParams;

    const getFollowingsRepository = new GetFollowingsRepository();
    const getFollowingsController = new GetFollowingsController(
      getFollowingsRepository
    );

    try {
      const { body, statusCode } = await getFollowingsController.handle({
        params: Params,
      });
      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
}

export default Get;