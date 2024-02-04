import User from "../../../models/user";
import { Message } from "../../protocols";

export interface UpdateBioParams {
    email: string;
    bio: string;
}

export interface IUpdateBioRepository {
    update(params: UpdateBioParams): Promise<User | Message>;
}