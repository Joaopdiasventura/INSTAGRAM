import { FastifyInstance } from "fastify";
import { FindUserController } from "../../controllers/User/findUserController/findUser";
import { FindUserParams } from "../../controllers/User/findUserController/protocols";
import { GetUserController } from "../../controllers/User/getUserController/getUser";
import { GetUserParams } from "../../controllers/User/getUserController/protocols";
import { GetUserPostsController } from "../../controllers/User/getUserPostsController/getUserPosts";
import { GetUserPostsParams } from "../../controllers/User/getUserPostsController/protocols";
import { FindUserRepository } from "../../repositories/User/findUserRepository/findUser";
import { GetUserPostsRepository } from "../../repositories/User/getUserPostsRepository/getUserPosts";
import { GetUserRepository } from "../../repositories/User/getUserRepository/getUser";

async function Get(app: FastifyInstance) {
  app.get("/user/:email", async (request, reply) => {
    const Params = request.params as GetUserParams;

    const getUserRepository = new GetUserRepository();
    const getUserController = new GetUserController(getUserRepository);

    try {
      const { body, statusCode } = await getUserController.handle({
        params: Params,
      });
      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  app.get("/user/posts/:email", async (request, reply) => {
    const Params = request.params as GetUserPostsParams;

    const getUserPostsRepository = new GetUserPostsRepository();
    const getUserPostsController = new GetUserPostsController(
      getUserPostsRepository
    );

    try {
      const { body, statusCode } = await getUserPostsController.handle({
        params: Params,
      });
      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  app.get("/find/:name", async (request, reply) => {
    const Params = request.params as FindUserParams;

    const findUserRepository = new FindUserRepository();
    const findUserController = new FindUserController(findUserRepository);

    try {
      const { body, statusCode } = await findUserController.handle({
        params: Params,
      });

      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
}

export default Get;