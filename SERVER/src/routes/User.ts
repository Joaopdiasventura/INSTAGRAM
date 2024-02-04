import { FastifyInstance, RouteHandlerMethod } from "fastify";
import { RegisterUserParams } from "../controllers/User/registerUserController/protocols";
import { RegisterUserRepository } from "../repositories/User/registerUserRepository/registerUser";
import { RegisterUserController } from "../controllers/User/registerUserController/registerUser";
import { LoginUserParams } from "../controllers/User/loginUserController/protocols";
import { LoginUserRepository } from "../repositories/User/loginUserRepository/loginUser";
import { LoginUserController } from "../controllers/User/loginUserController/loginUser";
import multer from 'fastify-multer';
import { UpdateImageParams } from "../controllers/User/updateImageController/protocols";
import { UpdateImageRepository } from "../repositories/User/updateImageRepository/updateImage";
import { UpdateImageController } from "../controllers/User/updateImageController/updateImage";
import { UpdateBioParams } from "../controllers/User/updateBioController/protocols";
import { UpdateBioRepository } from "../repositories/User/updateBioRepository/updateBio";
import { UpdateBioController } from "../controllers/User/updateBioController/updateBio";

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

  app.post("/login", async (request, reply) => {
    const Body = request.body as LoginUserParams;
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

  app.post("/updateImage",{ preHandler: upload.single("file") as RouteHandlerMethod }, async (request, reply) => {     
    const req = request as any;

    const Body: UpdateImageParams = {
      email: req.body.email,
      file: req.file
    };

    const updateImageRepository = new UpdateImageRepository();
    const updateImageController = new UpdateImageController(updateImageRepository);
    try {

      const {body, statusCode} = await updateImageController.handle({
        body: Body
      });

      reply.code(statusCode).send(body);
    } catch (error) {
      reply.status(500).send(error);
    }

  });

  app.post("/updateBio", async (request, reply) => {
    const Body = request.body as UpdateBioParams;

    const updateBioReposiotry = new UpdateBioRepository();
    const updateBioController = new UpdateBioController(updateBioReposiotry);

    try {
      const {body, statusCode} = await updateBioController.handle({
        body: Body
      });
      reply.code(statusCode).send(body);
    } catch (error) {
      reply.status(500).send(error);
    }
  });
}
