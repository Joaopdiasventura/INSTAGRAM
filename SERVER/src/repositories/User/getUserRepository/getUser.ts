import {
  GetUserParams,
  IGetUserRepository,
} from "../../../controllers/User/getUserController/protocols";
import { Message } from "../../../controllers/protocols";
import User from "../../../models/user";
import prisma from "../../../services/prisma";

export class GetUserRepository implements IGetUserRepository {
  async get(params: GetUserParams): Promise<User | Message> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: params.email },
      });
      if (!user) {
        return {
          message: "Usuário não foi encontrado",
        };
      }
      return user;
    } catch (error) {
      return error;
    }
  }
}