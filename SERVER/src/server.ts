import { FastifyInstance } from "fastify";
import app from "./app";

async function startServer(app: FastifyInstance) {
  try {
    const port = parseInt(process.env.PORT || "3000");

    await app.listen({ port, host: "0.0.0.0" });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer(app);