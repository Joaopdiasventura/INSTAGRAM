import Comment from "../../../models/comment";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { CommentPostParams, ICommentPostRepository } from "./protocols";

export class CommentPostController implements IController {
  constructor(private readonly commentPostrepository: ICommentPostRepository) {}
  async handle(
    request?: HttpRequest<CommentPostParams>
  ): Promise<HttpResponse<Comment>> {
    const { body } = request;

    try {
      const result = await this.commentPostrepository.comment(body);

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