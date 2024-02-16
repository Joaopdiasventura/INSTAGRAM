export function text(params: any, fields) {
  for (const field of fields) {
    if (!(field in params) || params[field] == null || params[field].trim() === "") {
      return {
        statusCode: 400,
        body: { message: `Preencha o campo: ${field}` },
      };
    }
  }
}

export function file(params: any, fields) {
  for (const field of fields) {
    if (!(field in params) || params[field] == null) {
      return {
        statusCode: 400,
        body: { message: `Preencha o campo: ${field}` },
      };
    }
  }
}