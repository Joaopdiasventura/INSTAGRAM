import { CommentPostParams } from "../../controllers/Comment/commentPostController/protocols";

export default function IsAll(body: CommentPostParams) {
  const fields = ["content", "email", "post"];

  for (const field of fields) {
    if (!(field in body) || body[field] == null || body[field].trim() === "") {
      return {
        statusCode: 400,
        body: { message: `Preencha o campo: ${field}` },
      };
    }
  }
}