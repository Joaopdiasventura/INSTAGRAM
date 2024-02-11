import { CreatePostParams } from "../../controllers/Post/createPostRepository/protocols";

export default function IsAll(body: CreatePostParams) {
  const fields = ["url_image", "fk_user_email"];

  for (const field of fields) {
    if (!(field in body) || body[field] == null) {
      return {
        statusCode: 400,
        body: { message: `Preencha o campo: ${field}` },
      };
    }
  }
}