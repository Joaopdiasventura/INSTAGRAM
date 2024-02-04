import Comment from "../../../models/comment";
import { Message } from "../../protocols";

export interface GetCommentParams {
    post: string;
}

export interface IGetCommentRepository {
    get(params: GetCommentParams): Promise<Comment[] | Message>;
}