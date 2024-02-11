import {
  FindUserParams,
  IFindUserRepository,
} from "../../../controllers/User/findUserController/protocols";
import User from "../../../models/user";
import prisma from "../../../services/prisma";

export class FindUserRepository implements IFindUserRepository {
  async find(params: FindUserParams): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: params.name,
        },
      },
    });

    return users;
  }
}