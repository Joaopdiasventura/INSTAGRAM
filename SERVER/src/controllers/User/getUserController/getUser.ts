import User from "../../../models/user";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { GetUserParams, IGetUserRepository } from "./protocols";

export class GetUserController implements IController {
  constructor(private readonly getUserRepository: IGetUserRepository) {}
  async handle(
    request?: HttpRequest<GetUserParams>
  ): Promise<HttpResponse<User>> {
    const { params } = request;

    try {
      const result = await this.getUserRepository.get(params);

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