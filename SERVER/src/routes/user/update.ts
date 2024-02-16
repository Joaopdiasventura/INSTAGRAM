import multer from "fastify-multer";
import { FastifyInstance, RouteHandlerMethod } from "fastify";
import { UpdateImageParams } from "../../controllers/User/updateImageController/protocols";
import { UpdateImageController } from "../../controllers/User/updateImageController/updateImage";
import { UpdateImageRepository } from "../../repositories/User/updateImageRepository/updateImage";
import { UpdateBioParams } from "../../controllers/User/updateBioController/protocols";
import { UpdateBioController } from "../../controllers/User/updateBioController/updateBio";
import { UpdateBioRepository } from "../../repositories/User/updateBioRepository/updateBio";

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function Updates(app: FastifyInstance): Promise<void> {
  app.post(
    "/updateImage",
    { preHandler: upload.single("file") as RouteHandlerMethod },
    async (request, reply) => {
      const req = request as any;

      const Body: UpdateImageParams = {
        email: req.body.email,
        file: req.file,
      };

      const updateImageRepository = new UpdateImageRepository();
      const updateImageController = new UpdateImageController(
        updateImageRepository
      );
      try {
        const { body, statusCode } = await updateImageController.handle({
          body: Body,
        });

        reply.code(statusCode).send(body);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  app.post("/updateBio", async (request, reply) => {
    const Body = request.body as UpdateBioParams;

    const updateBioReposiotry = new UpdateBioRepository();
    const updateBioController = new UpdateBioController(updateBioReposiotry);

    try {
      const { body, statusCode } = await updateBioController.handle({
        body: Body,
      });
      reply.code(statusCode).send(body);
    } catch (error) {
      reply.status(500).send(error);
    }
  });
}

export default Updates;