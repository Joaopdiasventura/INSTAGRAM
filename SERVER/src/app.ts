import { config } from "dotenv";
config();

import fastify from "fastify";
import multer from "fastify-multer";
import cors from "@fastify/cors";

import User from "./routes/User";
import Post from "./routes/Post";
import Follow from "./routes/Follow";
import Like from "./routes/Like";
import Token from "./routes/Token";
import Message from "./routes/Message";

const app = fastify({ logger: false });

const corsOptions = {
  origin: [process.env.FRONTEND],
  methods: ["GET", "DELETE", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.register(cors, corsOptions);

app.register(multer.contentParser);

app.register(User);
app.register(Post);
app.register(Follow);
app.register(Like);
app.register(Message);
app.register(Token);

export default app;