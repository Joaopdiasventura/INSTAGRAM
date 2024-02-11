import Comment from "../../../models/comment";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { GetCommentParams, IGetCommentRepository } from "./protocols";

export class GetCommentController implements IController {
  constructor(private readonly getCommentRepository: IGetCommentRepository) {}
  async handle(
    request?: HttpRequest<GetCommentParams>
  ): Promise<HttpResponse<Comment[]>> {
    const { params } = request;

    try {
      const result = await this.getCommentRepository.get(params);
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