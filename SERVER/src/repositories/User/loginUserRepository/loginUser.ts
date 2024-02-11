import {
  ILoginUserRepository,
  LoginUserParams,
} from "../../../controllers/User/loginUserController/protocols";
import { Message } from "../../../controllers/protocols";
import User from "../../../models/user";
import prisma from "../../../services/prisma";

export class LoginUserRepository implements ILoginUserRepository {
  async login(params: LoginUserParams): Promise<User | Message> {
    try {
      const user = await prisma.user.findFirst({
        where: { email: params.email },
      });

      if (!user) {
        return {
          message: "Email não encontrado",
        };
      }

      return user;
    } catch (error) {
      return error;
    }
  }
}