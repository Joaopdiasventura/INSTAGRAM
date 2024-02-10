import { FastifyInstance } from "fastify";
import Token from "../models/token";
import Code from "./token/code";
import Decode from "./token/decode";

export default async function Token(app: FastifyInstance) {
  app.register(Code);

  app.register(Decode);
}