import {
  GetUserPostsParams,
  IGetUserPostsRepository,
} from "../../../controllers/User/getUserPostsController/protocols";
import { Message } from "../../../controllers/protocols";
import Post from "../../../models/post";
import prisma from "../../../services/prisma";

export class GetUserPostsRepository implements IGetUserPostsRepository {
  async get(params: GetUserPostsParams): Promise<Post[] | Message> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: params.email },
      });
      if (!user) {
        return {
          message: "Usuário não encontrado ",
        };
      }
      const posts = await prisma.post.findMany({
        where: { fk_user_email: user.email },
      });

      return posts;
    } catch (error) {
      return error;
    }
  }
}