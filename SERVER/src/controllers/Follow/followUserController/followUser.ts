import Follow from "../../../models/follow";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { FollowUserParams, IFollowUserRepository } from "./protocols";

export class FollowUserController implements IController {
  constructor(private readonly followUserRepository: IFollowUserRepository) {}
  async handle(
    request?: HttpRequest<FollowUserParams>
  ): Promise<HttpResponse<Follow>> {
    const { body } = request;
    if (body.fk_user_email == body.fk_user_email_) {
      return {
        statusCode: 400,
        body: { message: "Não é possivel seguir a si mesmo" },
      };
    }
    try {
      const result = await this.followUserRepository.follow(body);

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