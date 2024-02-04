import Comment from "../../../models/comment";
import { Message } from "../../protocols";

export interface CommentPostParams {
    content:string;
    email: string;
    post: string;
}

export interface ICommentPostRepository {
    comment(params: CommentPostParams): Promise<Comment | Message>
}