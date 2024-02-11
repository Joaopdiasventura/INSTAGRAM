import {
  IUpdateImageRepository,
  UpdateImageParams,
} from "../../../controllers/User/updateImageController/protocols";
import { Message } from "../../../controllers/protocols";
import User from "../../../models/user";
import prisma from "../../../services/prisma";
import {
  AddImage,
  UpdateImage,
} from "../../../controllers/User/updateImageController/updateFile";

export class UpdateImageRepository implements IUpdateImageRepository {
  async update(params: UpdateImageParams): Promise<User | Message> {
    try {
      const user = await prisma.user.findFirst({
        where: { email: params.email },
      });
      if (!user) {
        return { message: "Usuaário não encontrado" };
      }
      if (
        user.picture ==
        "https://icones.pro/wp-content/uploads/2021/02/icono-de-camara-gris.png"
      ) {
        await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            picture: await AddImage(params.file),
          },
        });
        user.picture = (
          await prisma.user.findFirst({ where: { email: params.email } })
        ).picture;
      } else {
        await UpdateImage(params.file, user.picture);
      }
      return user;
    } catch (error) {
      return error;
    }
  }
}