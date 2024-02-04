import Like from "../../../models/like";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { GetLikesParams, IGetLikesRepository } from "./protocols";

export class GetLikesController implements IController{
    constructor(private readonly getLikesRepository: IGetLikesRepository){}
    async handle(request?: HttpRequest<GetLikesParams>): Promise<HttpResponse<Like[]>> {
        const {params} = request;
    
        try {
            const result = await this.getLikesRepository.get(params);

            if ("message" in result) {
                return {
                    statusCode: 400,
                    body: result
                };
            }

            return {
                statusCode: 200,
                body:  result
            };


        } catch (error) {
            return {
                statusCode: 500,
                body: error
            };
        }
    }
    
}