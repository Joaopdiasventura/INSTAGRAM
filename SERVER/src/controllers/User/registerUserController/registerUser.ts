import CreateJwt from "../../Token/code";
import bcrypt from "bcrypt";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IRegisterUserRepository, RegisterUserParams } from "./protocols";

export class RegisterUserController implements IController {
  constructor(
    private readonly registerUserRepository: IRegisterUserRepository
  ) {}
  async handle(
    request?: HttpRequest<RegisterUserParams>
  ): Promise<HttpResponse<string>> {
    const { body } = request;
    const hash = 10;
    body.password = await bcrypt.hash(body.password, hash);
    const fields = ["email", "password", "name"];

    for (const field of fields) {
      if (!(field in body)) {
        return {
          statusCode: 400,
          body: { message: `Preencha o campo: ${field}` },
        };
      }
    }

    try {
      const result = await this.registerUserRepository.register(body);
      if ("message" in result) {
        return {
          statusCode: 400,
          body: result,
        };
      }
      return {
        statusCode: 201,
        body: CreateJwt(result),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
