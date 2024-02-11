import bcrypt from "bcrypt";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IRegisterUserRepository, RegisterUserParams } from "./protocols";
import { CodeController } from "../../Token/code";

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

    try {
      const result = await this.registerUserRepository.register(body);
      if ("message" in result) {
        return {
          statusCode: 400,
          body: result,
        };
      }
      
    const codeController = new CodeController();
    
      return {
        statusCode: 201,
        body: (await codeController.handle({body: result})).body,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
