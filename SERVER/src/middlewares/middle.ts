export function text(params: any, fields) {
  for (const field of fields) {
    if (!(field in body) || body[field] == null) {
      return {
        statusCode: 400,
        body: { message: `Preencha o campo: ${field}` },
      };
    }
  }
}

export function file(params: any, fields) {
  for (const field of fields) {
    if (!(field in body) || body[field] == null || body[field].trim() === "") {
      return {
        statusCode: 400,
        body: { message: `Preencha o campo: ${field}` },
      };
    }
  }
}