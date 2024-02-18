import {
  GetCommentParams,
  IGetCommentRepository,
} from "../../../controllers/Message/getMessageController/protocols";
import { Message } from "../../../controllers/protocols";
import Comment from "../../../models/comment";
import prisma from "../../../services/prisma";

export class GetCommentRepository implements IGetCommentRepository {
  async get(params: GetCommentParams): Promise<Comment[] | Message> {
    try {
      const post = await prisma.post.findUnique({ where: { id: params.post } });
      if (!post) {
        return {
          message: "Post não Encontrado",
        };
      }

      const comments = await prisma.comment.findMany({
        where: { fk_post_id: post.id },
        orderBy: {
          id: "desc",
        },
      });
      return comments;
    } catch (error) {
      return error;
    }
  }
}