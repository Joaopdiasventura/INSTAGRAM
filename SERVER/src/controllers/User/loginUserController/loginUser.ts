import CreateJwt from "../../Token/code";
import bcrypt from "bcrypt";
import {
  HttpRequest,
  HttpResponse,
  IController,
  Message,
} from "../../protocols";
import { ILoginUserRepository, LoginUserParams } from "./protocols";

export class LoginUserController implements IController {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}
  async handle(
    request?: HttpRequest<LoginUserParams>
  ): Promise<HttpResponse<string | Message>> {
    const { body } = request;
    try {
      const result = await this.loginUserRepository.login(body);
      if ("message" in result) {
        return {
          statusCode: 400,
          body: result,
        };
      }
      
      if ("password" in result) {
        const passwordConfirm = await bcrypt.compare(body.password, result.password);
        
        if (!passwordConfirm) {
          return {
            statusCode: 400,
            body: { message: "Senha incorreta" },
          };
        }
      }

      return {
        statusCode: 200,
        body: CreateJwt(result),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
