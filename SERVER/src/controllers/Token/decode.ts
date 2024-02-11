import jwt from "jsonwebtoken";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import Token from "../../models/token";

export class DecodeController implements IController {
  async handle(request?: HttpRequest<Token>): Promise<HttpResponse<any>> {
    try {
      const { params } = request;
      const secretKey = process.env.SECRET_KEY;
      const decoded = jwt.verify(params.token, secretKey);
      return {
        statusCode: 200,
        body: decoded,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return {
        statusCode: 500,
        body: { error: "Internal Server Error" },
      };
    }
  }
}