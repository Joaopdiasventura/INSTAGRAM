import Like from "../../../models/like";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { ILikePostRepository, LikePostParams } from "./protocols";

export class LikePostController implements IController {
  constructor(private readonly likePostRepository: ILikePostRepository) {}
  async handle(
    request?: HttpRequest<LikePostParams>
  ): Promise<HttpResponse<Like>> {
    const { body } = request;

    try {
      const result = await this.likePostRepository.like(body);

      if ("message" in result) {
        return {
          statusCode: 400,
          body: result,
        };
      }

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