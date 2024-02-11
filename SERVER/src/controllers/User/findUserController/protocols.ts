import User from "../../../models/user";

export interface FindUserParams {
  name: string;
}

export interface IFindUserRepository {
  find(params: FindUserParams): Promise<User[]>;
}