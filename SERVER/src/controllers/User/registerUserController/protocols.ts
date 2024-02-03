import User from "../../../models/user";
import { Message } from "../../protocols";

export interface RegisterUserParams {
    email: string;
    name: string;
    password: string;
}

export interface IRegisterUserRepository {
    register(params: RegisterUserParams): Promise<User | Message>;
}