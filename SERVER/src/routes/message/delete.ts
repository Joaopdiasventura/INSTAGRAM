import { FastifyInstance } from "fastify";
import { DeleteCommentRepository } from "../../repositories/Message/deleteMessageRepository/deleteMessage";
import { DeleteCommentController } from "../../controllers/Message/deleteMessageController/deleteMessage";
import { DeleteCommentParams } from "../../controllers/Message/deleteMessageController/protocols";

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
