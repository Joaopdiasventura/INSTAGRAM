import { FastifyInstance } from "fastify";
import { DecodeController } from "../controllers/Token/decode";
import Token from "../models/token";
import CreateJwt from "../controllers/Token/code";

export default async function Token (app: FastifyInstance) {

    app.post("/decode",async (request, reply) => {
        const Params = request.body as Token;
        const decodeController = new DecodeController();

        try {
            const {body,  statusCode} = await decodeController.handle({
                params: Params
            });
            reply.status(statusCode).send(body);
        } catch (error) {
            reply.status(500).send(error);
        }
    });

    app.post("/code", async (request, reply) => {
        const body = request.body;
        if (body) {
            reply.code(201).send(CreateJwt(body));
        }
        else{
            reply.code(400).send({message: "Envie algo"});
        }
    });

}