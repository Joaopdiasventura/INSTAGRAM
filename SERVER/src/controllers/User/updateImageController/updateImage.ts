import User from "../../../models/user";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IUpdateImageRepository, UpdateImageParams } from "./protocols";

export class UpdateImageController implements IController {
    constructor(private readonly updateImageRepository: IUpdateImageRepository){}
  async handle(request?: HttpRequest<UpdateImageParams>): Promise<HttpResponse<User>> {
    const {body} = request;
    try {
        const result = await this.updateImageRepository.update(body);
        if ("message" in result) {
            return{
                statusCode:  400,
                body: result
            };
        }
        return {
            statusCode: 200,
            body: result
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: error
        };
    }
  }
}
