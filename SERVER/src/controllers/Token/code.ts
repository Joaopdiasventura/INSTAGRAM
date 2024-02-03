import jwt from "jsonwebtoken";

export default function CreateJwt(params: any): string {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(params, secretKey);
  return token;
}
