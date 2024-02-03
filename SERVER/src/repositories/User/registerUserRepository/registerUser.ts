import {
  IRegisterUserRepository,
  RegisterUserParams,
} from "../../../controllers/User/registerUserController/protocols";
import { Message } from "../../../controllers/protocols";
import User from "../../../models/user";
import prisma from "../../../services/prisma";

export class RegisterUserRepository implements IRegisterUserRepository {
  async register(params: RegisterUserParams): Promise<User | Message> {
    try {
      const existUser = await prisma.user.findFirst({
        where: { email: params.email },
      });
      
      if (existUser) {
        return {
          message: "Email já esta registrado no sistema",
        };
      }
      const user = await prisma.user.create({
        data: { ...params },
      });
      return user;
    } catch (error) {
      return error;
    }
  }
}
