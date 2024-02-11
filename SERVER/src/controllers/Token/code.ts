import { HttpRequest, HttpResponse, IController } from "../protocols";
import jwt from "jsonwebtoken";
export class CodeController implements IController {
  async handle(request?: HttpRequest<any>): Promise<HttpResponse<string>> {
    const { body } = request;
    const secretKey = process.env.SECRET_KEY;
    const token = await jwt.sign(body, secretKey);
    return {
      statusCode: 201,
      body: token,
    };
  }
}