import { env } from "@/config/config";
import { UserService } from "@/services/impl/UserService";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { decode } from "punycode";

const userService = new UserService();

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

    return new Promise((resolve, reject) => {
      if (!token) {
        return reject(new Error("No token provided"));
      }

      jwt.verify(token, env.jwt_secret, function (err: any, decoded: any) {
        if (err) {
          return reject(err);
        }

        if (scopes && scopes.length > 0) {
          for (let scope of scopes) {
            if (!decoded.roles.includes(scope)) {
              return reject(new Error("JWT does not contain required scope."));
            }
          }
        }

        resolve(decoded);
      });
    });
  }

  return Promise.reject(new Error("Invalid security name"));
}
