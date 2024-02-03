import Post from "../../../models/post";
import { Message } from "../../protocols";

export interface DeletePostParams {
    id: string;
}

export interface DeleteFileParams {
    url_image: string;
}

export interface IDeletePostRepository {
    delete(params: DeletePostParams):  Promise<Post | Message>;
}