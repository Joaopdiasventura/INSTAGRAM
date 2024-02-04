import Like from "../../../models/like";
import { Message } from "../../protocols";

export interface LikePostParams {
    email: string;
    post: string;
}

export interface ILikePostRepository {
    like(params: LikePostParams): Promise<Like | Message>;
}