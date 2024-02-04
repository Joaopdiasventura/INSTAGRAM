import { FastifyInstance } from "fastify";
import { CommentPostParams } from "../controllers/Comment/commentPostController/protocols";
import { CommentPostRepository } from "../repositories/Comment/commentPostRepository/commentPost";
import { CommentPostController } from "../controllers/Comment/commentPostController/commentPost";
import { GetCommentParams } from "../controllers/Comment/getCommentController/protocols";
import { GetCommentRepository } from "../repositories/Comment/getCommentRepository/getComment";
import { GetCommentController } from "../controllers/Comment/getCommentController/getComment";
import { DeleteCommentController } from "../controllers/Comment/deleteCommentController/deleteComment";
import { DeleteCommentRepository } from "../repositories/Comment/deleteCommentRepository/deleteComment";
import { DeleteCommentParams } from "../controllers/Comment/deleteCommentController/protocols";

export default async function Comment(app: FastifyInstance): Promise<void> {
  app.post("/comment", async (request, reply) => {
    const Body = request.body as CommentPostParams;

    const commentPostRepository = new CommentPostRepository();
    const commentPostController = new CommentPostController(
      commentPostRepository
    );

    try {
      const { body, statusCode } = await commentPostController.handle({
        body: Body,
      });

      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  app.get("/comment/:post", async (request, reply) => {
    const Params = request.params as GetCommentParams;

    const getCommentRepository = new GetCommentRepository();
    const getCommentController = new GetCommentController(
        getCommentRepository
    );

    try {
      const { body, statusCode } = await getCommentController.handle({
        params: Params,
      });

      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  app.delete("/comment/:comment", async (request, reply) => {
    const Params = request.params as DeleteCommentParams;

    const deleteCommentRepository = new DeleteCommentRepository();
    const deleteCommentController = new DeleteCommentController(
        deleteCommentRepository
    );

    try {
      const { body, statusCode } = await deleteCommentController.handle({
        params: Params,
      });

      reply.code(statusCode).send(body);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
}
