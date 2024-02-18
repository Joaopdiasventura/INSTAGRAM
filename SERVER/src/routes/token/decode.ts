import { FastifyInstance } from "fastify";
import { DecodeController } from "../../controllers/Token/decode";
import Token from "../../models/token";
import { text } from "../../middlewares";

async function Decode(app: FastifyInstance) {
  app.post("/decode", async (request, reply) => {
    const Body = request.body as Token;
    const decodeController = new DecodeController();

    const fields = ["token"];
    const validation = text(Body, fields);

    if (validation) {
      reply.status(validation.statusCode).send(validation.body);
      return;
    }

    try {
      const { body, statusCode } = await decodeController.handle({
        params: Body,
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.status(500).send(error);
    }
  });
}

export default Decode;