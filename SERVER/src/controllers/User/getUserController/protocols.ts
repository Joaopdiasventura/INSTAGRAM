import User from "../../../models/user";
import { Message } from "../../protocols";

export interface GetUserParams {
    email: string;
}

export interface IGetUserRepository {
    get(params: GetUserParams): Promise<User | Message>
}