import Post from "../../../models/post";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { DeletePostParams, IDeletePostRepository } from "./protocols";

export class DeletePostController implements IController {
  constructor(private readonly deletePostRepository: IDeletePostRepository) {}
  async handle(
    request?: HttpRequest<DeletePostParams>
  ): Promise<HttpResponse<Post>> {
    const { params } = request;
    try {
      const result = await this.deletePostRepository.delete(params);
      if ("message" in result) {
        return {
          statusCode: 400,
          body: result,
        };
      }
      return {
        statusCode: 200,
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