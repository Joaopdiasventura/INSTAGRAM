import Post from "../../../models/post";
import { Message } from "../../protocols";

export interface CreatePostParams {
  url_image:     string
  description:   string
  fk_user_email: string;
}

export interface ICreatePostRepository {
    post(params: CreatePostParams):Promise<Post | Message>;
}