import User from "../../../models/user";
import { Message } from "../../protocols";

export interface LoginUserParams {
    email: string;
    password: string;
}

export interface ILoginUserRepository {
    login(params: LoginUserParams):Promise<User | Message>;
}