import { jwtVerify } from "jose";

export const verifyToken = async <T>(jwt: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const result = await jwtVerify<T>(jwt, secret);
  return result;
};
