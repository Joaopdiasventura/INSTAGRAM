import Post from "../../../models/post";
import {
  HttpRequest,
  HttpResponse,
  IController,
  Message,
} from "../../protocols";
import { GetPostsParams, IGetPostsRepository } from "./protocols";

export class GetPostsController implements IController {
  constructor(private readonly getPostsRepository: IGetPostsRepository) {}
  async handle(
    request?: HttpRequest<GetPostsParams>
  ): Promise<HttpResponse<Post[] | Message>> {
    const { params } = request;
    try {
      const result = await this.getPostsRepository.get(params);
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