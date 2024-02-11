import User from "../../../models/user";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IUpdateBioRepository, UpdateBioParams } from "./protocols";

export class UpdateBioController implements IController {
  constructor(private readonly updateBioReposiotry: IUpdateBioRepository) {}
  async handle(
    request?: HttpRequest<UpdateBioParams>
  ): Promise<HttpResponse<User>> {
    const { body } = request;

    try {
      const result = await this.updateBioReposiotry.update(body);

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