import {
  GetLikesParams,
  IGetLikesRepository,
} from "../../../controllers/Like/getLikesController/protocols";
import { Message } from "../../../controllers/protocols";
import Like from "../../../models/like";
import prisma from "../../../services/prisma";

export class GetLikesRepository implements IGetLikesRepository {
  async get(params: GetLikesParams): Promise<Like[] | Message> {
    try {
      const post = await prisma.post.findUnique({ where: { id: params.post } });

      if (!post) {
        return {
          message: "Post não foi encontrado",
        };
      }

      const likes = await prisma.like.findMany({
        where: {
          fk_post_id: post.id,
        },
      });

      return likes;
    } catch (error) {
      return error;
    }
  }
}