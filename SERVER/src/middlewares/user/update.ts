import { UpdateImageParams } from "../../controllers/User/updateImageController/protocols";
import { UpdateBioParams } from "../../controllers/User/updateBioController/protocols";

export default function IsAll(body: UpdateImageParams | UpdateBioParams) {
  if ("file" in body) {
    const fields = ["file", "email"];

    for (const field of fields) {
      if (!(field in body) || body[field] == null) {
        return {
          statusCode: 400,
          body: { message: `Preencha o campo: ${field}` },
        };
      }
    }
  } else {
    const fields = ["bio", "email"];

    for (const field of fields) {
      if (!(field in body) || body[field] == null) {
        return {
          statusCode: 400,
          body: { message: `Preencha o campo: ${field}` },
        };
      }
    }
  }
}