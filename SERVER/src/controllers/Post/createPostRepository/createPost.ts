import Post from "../../../models/post";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { CreatePostParams, ICreatePostRepository } from "./protocols";

export class CreatePostController implements IController {
  constructor(private readonly createPostRepository: ICreatePostRepository) {}
  async handle(
    request?: HttpRequest<CreatePostParams>
  ): Promise<HttpResponse<Post>> {
    const { body } = request;
    try {
      const result = await this.createPostRepository.post(body);

      return {
        statusCode: 201,
        body: result,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}