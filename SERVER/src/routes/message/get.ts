import { FastifyInstance } from "fastify";
import { GetCommentRepository } from "../../repositories/Message/getMessageRepository/getMessage";
import { GetCommentParams } from "../../controllers/Message/getMessageController/protocols";
import { GetCommentController } from "../../controllers/Message/getMessageController/getMessage";

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
