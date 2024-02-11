import {
  FollowUserParams,
  IFollowUserRepository,
} from "../../../controllers/Follow/followUserController/protocols";
import { Message } from "../../../controllers/protocols";
import Follow from "../../../models/follow";
import prisma from "../../../services/prisma";

export class FollowUserRepository implements IFollowUserRepository {
  async follow(params: FollowUserParams): Promise<Follow | Message> {
    try {
      const user = await prisma.user.findFirst({
        where: { email: params.fk_user_email },
      });
      if (!user) return { message: "Usuário não encontrado" };
      const user_ = await prisma.user.findFirst({
        where: { email: params.fk_user_email_ },
      });
      if (!user_)
        return { message: "Usuário que vai ser seguido não encontrado" };

      const existFollow = await prisma.follow.findFirst({
        where: {
          OR: [
            {
              fk_user_email: params.fk_user_email,
              fk_user_email_: params.fk_user_email_,
            },
            {
              fk_user_email: params.fk_user_email_,
              fk_user_email_: params.fk_user_email,
            },
          ],
        },
      });

      if (existFollow) {
        await prisma.follow.delete({ where: { id: existFollow.id } });
        return existFollow;
      }

      const Follow = await prisma.follow.create({
        data: { ...params },
      });
      return Follow;
    } catch (error) {
      return error;
    }
  }
}