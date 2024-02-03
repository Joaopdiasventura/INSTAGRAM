import { DeleteFile } from "../../../controllers/Post/deletePostRepository/deleteFile";
import {
  DeletePostParams,
  IDeletePostRepository,
} from "../../../controllers/Post/deletePostRepository/protocols";
import { Message } from "../../../controllers/protocols";
import Post from "../../../models/post";
import prisma from "../../../services/prisma";

export class DeletePostRepository implements IDeletePostRepository {
  async delete(params: DeletePostParams): Promise<Post | Message> {
    try {
      const post = await prisma.post.findFirst({ where: { id: params.id } });

      if (!post) {
        return {
          message: "Post não encontrado",
        };
      }

      await DeleteFile(post);

      await prisma.post.delete({ where: {id: post.id } });
      return post;
    } catch (error) {
      return error;
    }
  }
}
