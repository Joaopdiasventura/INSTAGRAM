import {
  CreatePostParams,
  ICreatePostRepository,
} from "../../../controllers/Post/createPostRepository/protocols";
import { Message } from "../../../controllers/protocols";
import Post from "../../../models/post";
import prisma from "../../../services/prisma";

export class CreatePostRepository implements ICreatePostRepository {
  async post(params: CreatePostParams): Promise<Post | Message> {
    try {
      const post = await prisma.post.create({
        data: { ...params },
      });
      return post;
    } catch (error) {
      return error;
    }
  }
}