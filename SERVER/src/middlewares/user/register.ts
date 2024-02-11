import { RegisterUserParams } from "../../controllers/User/registerUserController/protocols";

export default function IsAll(body: RegisterUserParams) {
  const fields = ["name", "email", "password"];

  for (const field of fields) {
    if (!(field in body) || body[field] == null || body[field].trim() === "") {
      return {
        statusCode: 400,
        body: { message: `Preencha o campo: ${field}` },
      };
    }
  }
}