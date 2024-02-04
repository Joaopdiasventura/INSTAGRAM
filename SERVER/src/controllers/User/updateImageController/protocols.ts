import User from "../../../models/user";
import { Message } from "../../protocols";

export interface UpdateImageParams {
    email: string;
    file: File;
}

export interface IUpdateImageRepository {
    update(params: UpdateImageParams): Promise<User | Message>;
}

export interface File {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    buffer: any;
    size: number
  }