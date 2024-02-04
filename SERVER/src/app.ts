import { config } from "dotenv";
config();

import fastify from "fastify";
import multer from "fastify-multer";
import cors from "@fastify/cors";
import startServer from "./server";

import User from "./routes/User";
import Post from "./routes/Post";
import Follow from "./routes/Follow";

const app = fastify({ logger: true });

const corsOptions = {
  origin: [process.env.FRONTEND],
  methods: ["GET", "PUT", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.register(cors, corsOptions); 

app.register(multer.contentParser);

app.register(User);
app.register(Post);
app.register(Follow);

startServer(app);
