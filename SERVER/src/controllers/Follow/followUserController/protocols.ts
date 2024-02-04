import Follow from "../../../models/follow";
import { Message } from "../../protocols";

export interface FollowUserParams {
  fk_user_email: string;
  fk_user_email_: string;
}

export interface IFollowUserRepository {
    follow(params: FollowUserParams): Promise<Follow | Message>;
}