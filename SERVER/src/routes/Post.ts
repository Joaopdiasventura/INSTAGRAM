import { FastifyInstance, RouteHandlerMethod } from "fastify";
import { upload } from "../services/aws";
import { CreatePostParams } from "../controllers/Post/createPostRepository/protocols";
import { CreatePostRepository } from "../repositories/Post/createPostRepository/createPost";
import { CreatePostController } from "../controllers/Post/createPostRepository/createPost";

export default async function Post(app: FastifyInstance): Promise<void> {
  app.post(
    "/post",
    { preHandler: upload.single("file") as RouteHandlerMethod },
    async (request, reply) => {
      const Body = request.body as CreatePostParams;
      const file = (request as any).file;
      Body.url_image = file.location;

      const createPostRepository = new CreatePostRepository();
      const createPostController = new CreatePostController(
        createPostRepository
      );
      try {
        const { body, statusCode } = await createPostController.handle({
          body: Body,
        });
        reply.status(statusCode).send(body);
      } catch (error) {
        reply.status(500).send(error);
      }
      reply.send({ message: "Arquivo enviado com sucesso!", filename: file });
    }
  );
}