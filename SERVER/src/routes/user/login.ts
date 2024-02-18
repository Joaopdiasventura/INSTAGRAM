import { FastifyInstance } from "fastify";
import { LoginUserController } from "../../controllers/User/loginUserController/loginUser";
import { LoginUserParams } from "../../controllers/User/loginUserController/protocols";
import { LoginUserRepository } from "../../repositories/User/loginUserRepository/loginUser";
import { text } from "../../middlewares";

async function Login(app: FastifyInstance): Promise<void> {
  app.post("/login", async (request, reply) => {
    const Body = request.body as LoginUserParams;

    const fields = ["email", "password"];
    const validation = text(Body, fields);

    if (validation) {
      reply.status(validation.statusCode).send(validation.body);
      return;
    }

    const loginUserRepository = new LoginUserRepository();
    const loginUserController = new LoginUserController(loginUserRepository);

    try {
      const { body, statusCode } = await loginUserController.handle({
        body: Body,
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.status(500).send(error);
    }
  });
}

export default Login;