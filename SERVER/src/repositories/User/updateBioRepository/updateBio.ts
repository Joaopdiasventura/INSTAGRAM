import {
  IUpdateBioRepository,
  UpdateBioParams,
} from "../../../controllers/User/updateBioController/protocols";
import { Message } from "../../../controllers/protocols";
import User from "../../../models/user";
import prisma from "../../../services/prisma";

export class UpdateBioRepository implements IUpdateBioRepository {
  async update(params: UpdateBioParams): Promise<User | Message> {
    const user = await prisma.user.findFirst({
      where: { email: params.email },
    });
    if (!user) {
      return {
        message: "Usuário não encontrado",
      };
    }
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        bio: params.bio,
      },
    });
    user.bio = (
      await prisma.user.findFirst({ where: { email: params.email } })
    ).bio;
    return user;
  }
}
