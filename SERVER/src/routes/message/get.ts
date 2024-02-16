import { FastifyInstance } from "fastify";
import { GetCommentController } from "../../controllers/Comment/getCommentController/getComment";
import { GetCommentParams } from "../../controllers/Comment/getCommentController/protocols";
import { GetCommentRepository } from "../../repositories/Comment/getMessageRepository/getMessage";

async function Get(app: FastifyInstance) {
  app.get("/comment/:post", async (request, reply) => {
    const Params = request.params as GetCommentParams;

    const getCommentRepository = new GetCommentRepository();
    const getCommentController = new GetCommentController(getCommentRepository);

    try {
      const { body, statusCode } = await getCommentController.handle({
        params: Params,
      });

      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
}

export default Get;