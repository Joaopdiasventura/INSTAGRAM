import {
  GetFollowingsParams,
  IGetFollowingsRepository,
} from "../../../controllers/Follow/getFollowingsController/protocols";
import { Message } from "../../../controllers/protocols";
import User from "../../../models/user";
import prisma from "../../../services/prisma";

export class GetFollowingsRepository implements IGetFollowingsRepository {
  async get(params: GetFollowingsParams): Promise<User[] | Message> {
    try {
      const User = await prisma.user.findFirst({
        where: { email: params.email },
      });
      if (!User) return { message: "Usuário não encontrado" };

      const Users = [];
      const follows = await prisma.follow.findMany({
        where: { fk_user_email: params.email },
      });
      for (let i = 0; i < follows.length; i++) {
        const user = await prisma.user.findFirst({
          where: { email: follows[i].fk_user_email_ },
        });
        Users.push(user);
      }
      return Users;
    } catch (error) {
      return error;
    }
  }
}
