import { FastifyInstance, RouteHandlerMethod } from "fastify";
import { upload } from "../../services/aws";
import { CreatePostController } from "../../controllers/Post/createPostRepository/createPost";
import { CreatePostParams } from "../../controllers/Post/createPostRepository/protocols";
import { CreatePostRepository } from "../../repositories/Post/createPostRepository/createPost";
import { file } from "../../middlewares";

async function Post(app: FastifyInstance) {
  app.post(
    "/post",
    { preHandler: upload.single("file") as RouteHandlerMethod },
    async (request, reply) => {
      const Body = request.body as CreatePostParams;
      const File = (request as any).file;
      
      Body.url_image = File;
 
      const fields = ["url_image", "fk_user_email"];
      const validation = file(Body, fields);
  
      if (validation) {
        reply.status(validation.statusCode).send(validation.body);
        return;
      }

      Body.url_image = File.location;
      
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

export default Post;