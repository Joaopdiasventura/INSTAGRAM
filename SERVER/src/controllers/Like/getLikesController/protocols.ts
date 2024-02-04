import Like from "../../../models/like";
import { Message } from "../../protocols";

export interface GetLikesParams {
    post: string;
}

export interface IGetLikesRepository {
    get(params: GetLikesParams): Promise<Like[] | Message>
}