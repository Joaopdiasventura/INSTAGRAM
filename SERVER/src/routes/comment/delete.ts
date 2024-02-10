import { FastifyInstance } from "fastify";
import { DeleteCommentController } from "../../controllers/Comment/deleteCommentController/deleteComment";
import { DeleteCommentParams } from "../../controllers/Comment/deleteCommentController/protocols";
import { DeleteCommentRepository } from "../../repositories/Comment/deleteCommentRepository/deleteComment";

async function Delete(app: FastifyInstance): Promise<void> {
  app.delete("/comment/:comment", async (request, reply) => {
    const Params = request.params as DeleteCommentParams;

    const deleteCommentRepository = new DeleteCommentRepository();
    const deleteCommentController = new DeleteCommentController(
      deleteCommentRepository
    );

    try {
      const { body, statusCode } = await deleteCommentController.handle({
        params: Params,
      });

      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
}

export default Delete;