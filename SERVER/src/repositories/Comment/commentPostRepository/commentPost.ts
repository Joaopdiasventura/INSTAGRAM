import {
  CommentPostParams,
  ICommentPostRepository,
} from "../../../controllers/Comment/commentPostController/protocols";
import { Message } from "../../../controllers/protocols";
import Comment from "../../../models/comment";
import prisma from "../../../services/prisma";

export class CommentPostRepository implements ICommentPostRepository {
  async comment(params: CommentPostParams): Promise<Message | Comment> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: params.email },
      });
      if (!user) {
        return {
          message: "Usuário não encontrado",
        };
      }

      const post = await prisma.post.findUnique({ where: { id: params.post } });
      if (!post) {
        return {
          message: "Post não encontrado",
        };
      }

      const comment = await prisma.comment.create({
        data: {
          content: params.content,
          fk_user_email: user.email,
          fk_post_id: post.id
        },
      });

      return comment;
    } catch (error) {
      return error;
    }
  }
}