import User from "../../../models/user";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { GetFollowersParams, IGetFollowersRepository } from "./protocols";

export class GetFollowersController implements IController {
  constructor(
    private readonly getFollowersRepository: IGetFollowersRepository
  ) {}
  async handle(
    request?: HttpRequest<GetFollowersParams>
  ): Promise<HttpResponse<User[]>> {
    const { params } = request;

    try {
      const result = await this.getFollowersRepository.get(params);

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