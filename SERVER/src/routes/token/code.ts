import { FastifyInstance } from "fastify";
import { CodeController } from "../../controllers/Token/code";

async function Code(app: FastifyInstance) {
  app.post("/code", async (request, reply) => {
    const Body = request.body;
    const codeController = new CodeController();

    try {
      const { body, statusCode } = await codeController.handle({
        body: Body,
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.status(500).send(error);
    }
  });
}

export default Code;
