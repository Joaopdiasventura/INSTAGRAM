import { FastifyInstance } from "fastify";
import { RegisterUserParams } from "../controllers/User/registerUserController/protocols";
import { RegisterUserRepository } from "../repositories/User/registerUserRepository/registerUser";
import { RegisterUserController } from "../controllers/User/registerUserController/registerUser";
import { LoginUserParams } from "../controllers/User/loginUserController/protocols";
import { LoginUserRepository } from "../repositories/User/loginUserRepository/loginUser";
import { LoginUserController } from "../controllers/User/loginUserController/loginUser";

export default async function (app: FastifyInstance): Promise<void> {
  app.post("/register", async (request, reply) => {
    const Body = request.body as RegisterUserParams;

    const registerUserRepository = new RegisterUserRepository();
    const registerUserController = new RegisterUserController(
      registerUserRepository
    );

    try {
      const { body, statusCode } = await registerUserController.handle({
        body: Body,
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.status(500).send(error);
    }
  });

  app.post("/login",async (request, reply) => {
    const Body = request.body as LoginUserParams
    const loginUserRepository = new LoginUserRepository();
    const loginUserController = new LoginUserController(loginUserRepository);

    try {
      const {body, statusCode} = await loginUserController.handle({
        body: Body
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.status(500).send(error);
    }
  })
}