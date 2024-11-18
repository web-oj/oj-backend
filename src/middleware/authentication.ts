import { env } from "@/config/config";
import { Request } from "express";
import jwt from "jsonwebtoken";

export type TokenInfo = {
  id: number;
  role: string;
}

export async function decodeJWT(token: string) {
  const decoded: TokenInfo = await new Promise((resolve, reject) => {
    jwt.verify(token, env.jwt_secret, (err: any, decoded: any) => {
      console.log(decoded);
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
  return decoded;
}

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
) {
  if (securityName === "api_key") {
    let token;
    if (request.query && request.query.access_token) {
      token = request.query.access_token;
    }

    if (token === "abc123456") {
      return Promise.resolve({
        id: 1,
        name: "Ironman",
      });
    } else {
      return Promise.reject({});
    }
  }

  if (securityName === "jwt") {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers["x-access-token"];

    if (!token) {
      throw new Error("No token provided");
    }

    const decoded: TokenInfo = await decodeJWT(token);

    if (scopes && scopes.length > 0) {
      for (let scope of scopes) {
        if (!decoded.role.includes(scope)) {
          throw new Error("Invalid scope");
        }
      }
    }
  }

  throw new Error("No token provided");
}
