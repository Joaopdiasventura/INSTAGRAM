import { LikePostParams } from "../../controllers/Like/likePostController/protocols";

export default function IsAll(body: LikePostParams) {
  const fields = ["email", "post"];

  for (const field of fields) {
    if (!(field in body) || body[field] == null || body[field].trim() === "") {
      return {
        statusCode: 400,
        body: { message: `Preencha o campo: ${field}` },
      };
    }
  }
}