import { GetUserParams } from "../../controllers/User/getUserController/protocols";

export default function IsAll(params: GetUserParams) {
  if (
    !("email" in params) ||
    params["email"] == null ||
    params["email"].trim() === ""
  ) {
    return {
      statusCode: 400,
      body: { message: `Adicione o campo: email` },
    };
  }
}