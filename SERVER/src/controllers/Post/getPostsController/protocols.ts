import Post from "../../../models/post";
import { Message } from "../../protocols";

export interface GetPostsParams {
    email: string;
}

export interface IGetPostsRepository {
    get(params: GetPostsParams): Promise<Post[] | Message>;
}