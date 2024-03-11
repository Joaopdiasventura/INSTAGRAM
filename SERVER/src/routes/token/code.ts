import { FastifyInstance } from "fastify";
import { CodeController } from "../../controllers/Token/code";
import { text } from "../../middlewares";

async function Code(app: FastifyInstance) {
  app.post("/code", async (request, reply) => {
    const Body = request.body;

    if (!Body || Object.keys(Body).length === 0) {
      reply.status(400).send("O corpo da solicitação está vazio ou ausente.");
      return;
    }
    

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