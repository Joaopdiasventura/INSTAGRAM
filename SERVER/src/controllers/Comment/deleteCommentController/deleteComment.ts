import { HttpRequest, HttpResponse, IController, Message } from "../../protocols";
import { DeleteCommentParams, IDeleteCommentRepository } from "./protocols";
import Comment from "../../../models/comment";

export class DeleteCommentController implements IController {
    constructor(private readonly deleteCommentRepository: IDeleteCommentRepository){}
    async handle(request?: HttpRequest<DeleteCommentParams>): Promise<HttpResponse<Comment>> {
        const {params} = request;
        try {

            const result = await this.deleteCommentRepository.delete(params);
            if ("message" in result) {
                return {
                    statusCode: 400,
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