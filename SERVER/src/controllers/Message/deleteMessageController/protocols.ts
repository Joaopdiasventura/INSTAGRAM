import Comment from "../../../models/comment";
import { Message } from "../../protocols";

export interface DeleteCommentParams {
  comment: string;
}

export interface IDeleteCommentRepository {
  delete(params: DeleteCommentParams): Promise<Comment | Message>;
}