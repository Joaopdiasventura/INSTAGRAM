import { HttpResponse, Message } from "../controllers/protocols";

export function text(params: any, fields: string[]): HttpResponse<Message> {
  for (const field of fields) {
    if (!(field in params) || params[field] == null || params[field].trim() === "") {
      return {
        statusCode: 400,
        body: { message: `Preencha o campo: ${field}` },
      };
    }
  }
}

export function file(params: any, fields: any[]): HttpResponse<Message> {
  for (const field of fields) {
    if (!(field in params) || params[field] == null) {
      return {
        statusCode: 400,
        body: { message: `Adicione uma imagem no campo: 'file'` },
      };
    }
  }
}