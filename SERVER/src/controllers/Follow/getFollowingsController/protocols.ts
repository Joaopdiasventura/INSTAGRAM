import User from "../../../models/user";
import { Message } from "../../protocols";

export interface GetFollowingsParams {
    email: string;
};

export interface IGetFollowingsRepository {
    get(params: GetFollowingsParams):Promise<User[] | Message>
};