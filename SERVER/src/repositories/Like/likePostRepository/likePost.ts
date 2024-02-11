import {
  ILikePostRepository,
  LikePostParams,
} from "../../../controllers/Like/likePostController/protocols";
import { Message } from "../../../controllers/protocols";
import Like from "../../../models/like";
import prisma from "../../../services/prisma";

export class LikePostRepository implements ILikePostRepository {
  async like(params: LikePostParams): Promise<Like | Message> {
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

      const liked = await prisma.like.findFirst({
        where: {
          fk_user_email: user.email,
          fk_post_id: post.id,
        },
      });

      if (liked) {
        await prisma.like.delete({
          where: {
            id: liked.id,
          },
        });

        return liked;
      }

      const like = await prisma.like.create({
        data: {
          fk_user_email: user.email,
          fk_post_id: post.id,
        },
      });

      return like;
    } catch (error) {
      return error;
    }
  }
}