import {
  DeleteCommentParams,
  IDeleteCommentRepository,
} from "../../../controllers/Message/deleteMessageController/protocols";
import { Message } from "../../../controllers/protocols";
import Comment from "../../../models/comment";
import prisma from "../../../services/prisma";

export class DeleteCommentRepository implements IDeleteCommentRepository {
  async delete(params: DeleteCommentParams): Promise<Message | Comment> {
    try {
      const comment = await prisma.comment.findUnique({
        where: { id: params.comment },
      });
      if (!comment) {
        return {
          message: "Comentário não encontrado",
        };
      }
      await prisma.comment.delete({ where: { id: comment.id } });
      return comment;
    } catch (error) {
      return error;
    }
  }
}