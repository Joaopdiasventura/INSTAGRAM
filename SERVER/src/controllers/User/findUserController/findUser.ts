import User from "../../../models/user";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { FindUserParams, IFindUserRepository } from "./protocols";

export class FindUserController implements IController {
    constructor(private readonly findUserRepository: IFindUserRepository){}
    async handle(request?: HttpRequest<FindUserParams>): Promise<HttpResponse<User[]>> {
        const {params} = request;

        try {
            const users = await this.findUserRepository.find(params);

            return {
                statusCode: 200,
                body: users
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: error
            };
        }
    }
}