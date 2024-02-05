import Post from "../../../models/post";
import { Message } from "../../protocols";

export interface GetUserPostsParams {
    email: string;
}

export interface IGetUserPostsRepository {
    get(params: GetUserPostsParams): Promise<Post[] | Message>;
}