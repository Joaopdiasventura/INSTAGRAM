import { LoginUserParams } from "../../controllers/User/loginUserController/protocols";

export default function IsAll(body: LoginUserParams) {
  const fields = [ "email", "password"];

  for (const field of fields) {
    if (!(field in body) || body[field] == null || body[field].trim() === "") {
      return {
        statusCode: 400,
        body: { message: `Preencha o campo: ${field}` },
      };
    }
  }
}