import axios from "axios";
import { FastifyInstance } from "fastify";
import { GetUserParams } from "../../controllers/User/getUserController/protocols";
import { RegisterUserParams } from "../../controllers/User/registerUserController/protocols";
import { RegisterUserController } from "../../controllers/User/registerUserController/registerUser";
import { RegisterUserRepository } from "../../repositories/User/registerUserRepository/registerUser";
import IsAll from "../../middlewares/user/register";

async function Register(app: FastifyInstance) {
  const Axios = axios.create({
    baseURL: "https://email-4ocx.onrender.com",
  });

  app.get("/email/:email", async (request, reply) => {
    try {
      const Params = request.params as GetUserParams;
      const cod = (Math.random() * 999).toFixed(0);

      try {
        await Axios.post("/", {
          from: process.env.EMAIL_USER,
          password: process.env.EMAIL_PASSWORD,
          to: Params.email,
          title: "CÓDIGO DE VERIFICAÇÃO DO TWITTER",
          content: cod,
        });
        reply.status(200).send(cod);
      } catch (error) {
        reply.send(error);
      }
    } catch (error) {
      reply.send("Erro ao enviar o email: " + error);
    }
  });

  app.post("/register", async (request, reply) => {
    const Body = request.body as RegisterUserParams;

    const validation = IsAll(Body);

    if (validation) {
      reply.status(validation.statusCode).send(validation.body);
      return;
    }

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
}

export default Register;