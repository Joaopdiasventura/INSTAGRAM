import Post from "../../../models/post";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { GetUserPostsParams, IGetUserPostsRepository } from "./protocols";

export class GetUserPostsController implements IController {
  constructor(
    private readonly getUserPostsRepository: IGetUserPostsRepository
  ) {}
  async handle(
    request?: HttpRequest<GetUserPostsParams>
  ): Promise<HttpResponse<Post[]>> {
    const { params } = request;

    try {
      const result = await this.getUserPostsRepository.get(params);
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