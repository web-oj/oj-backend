import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function auth(
  req: Request,
  res: Response,
  next: NextFunction,
  roles: string[],
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).send({
      status: "error",
      message: "Invalid Authorization Header",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        status: "error",
        message: "Invalid Token",
      });
    } else {
      const userInfo =
        typeof decoded === "string" ? JSON.parse(decoded) : decoded;

      const permissions = userInfo.role;

      if (permissions.includes(roles)) {
        next();
      } else {
        return res.status(401).send({
          status: "error",
          message: "Forbidden",
        });
      }
    }
  });
}
