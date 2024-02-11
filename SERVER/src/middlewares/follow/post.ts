import { FollowUserParams } from "../../controllers/Follow/followUserController/protocols";

export default function IsAll(body: FollowUserParams) {
  const fields = ["fk_user_email", "fk_user_email_"];

  for (const field of fields) {
    if (!(field in body) || body[field] == null || body[field].trim() === "") {
      return {
        statusCode: 400,
        body: { message: `Preencha o campo: ${field}` },
      };
    }
  }
}