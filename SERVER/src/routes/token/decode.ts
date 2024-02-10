import { FastifyInstance } from "fastify";
import { DecodeController } from "../../controllers/Token/decode";
import Token from "../../models/token";

async function Decode(app: FastifyInstance) {
  app.post("/decode", async (request, reply) => {
    const Params = request.body as Token;
    const decodeController = new DecodeController();

    try {
      const { body, statusCode } = await decodeController.handle({
        params: Params,
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.status(500).send(error);
    }
  });
}

export default Decode;