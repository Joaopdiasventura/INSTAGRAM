import {
  GetFollowersParams,
  IGetFollowersRepository,
} from "../../../controllers/Follow/getFollowersController/protocols";
import { Message } from "../../../controllers/protocols";
import User from "../../../models/user";
import prisma from "../../../services/prisma";

export class GetFollowersRepository implements IGetFollowersRepository {
  async get(params: GetFollowersParams): Promise<User[] | Message> {
    try {
      const User = await prisma.user.findFirst({
        where: { email: params.email },
      });
      if (!User) return { message: "Usuário não encontrado" };

      const Users = [];
      const follows = await prisma.follow.findMany({
        where: { fk_user_email_: params.email },
      });
      for (let i = 0; i < follows.length; i++) {
        const user = await prisma.user.findFirst({
          where: { email: follows[i].fk_user_email },
        });
        Users.push(user);
      }
      return Users;
    } catch (error) {
      return error;
    }
  }
}