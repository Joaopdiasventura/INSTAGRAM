import User from "../../../models/user";
import { Message } from "../../protocols";

export interface GetFollowersParams {
    email: string;
};

export interface IGetFollowersRepository {
    get(params: GetFollowersParams):Promise<User[] | Message>
};