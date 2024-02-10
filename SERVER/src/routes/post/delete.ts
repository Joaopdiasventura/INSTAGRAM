import { FastifyInstance } from "fastify";
import { DeletePostParams } from "../../controllers/Post/deletePostRepository/protocols";
import { DeletePostController } from "../../controllers/Post/deletePostRepository/deletePost";
import { DeletePostRepository } from "../../repositories/Post/deletePostRepository/deletePost";

async function Delete(app: FastifyInstance) {
    app.delete("/post/:id", async (request, reply) => {
        const Params = request.params as DeletePostParams;
    
        const deletePostRepository = new DeletePostRepository();
        const deletePostController = new DeletePostController(deletePostRepository);
    
        try {
          const { body, statusCode } = await deletePostController.handle({
            params: Params,
          });
    
          reply.status(statusCode).send(body);
        } catch (error) {
          reply.status(500).send(error);
        }
      });
}

export default Delete;