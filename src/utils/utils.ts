import { env } from "@/config/config";
import { User } from "@/entities/User";
import { TokenInfo } from "@/types/types";
import { sign } from "jsonwebtoken";
import keccak256 from "keccak256";

export function validatePassword(password: string, user: User): boolean {
  return keccak256(password).toString("hex") === user.password;
}

export function signToken(payload: TokenInfo): string {
  return sign(payload, env.jwt_secret, {
    expiresIn: "2days",
  });
}

export function signUserToken(user: User): string {
  return sign({ id: user.id, role: user.role }, env.jwt_secret, {
    expiresIn: "2days",
  });
}