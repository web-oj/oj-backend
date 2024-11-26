/**
 * @file user.ts
 * @summary User controller class.
 * @description This file contains function(s) which call our respective service(s) to get the data.
 * @function
 *          - createUser()
 *          - updateUser()
 *          - softDeleteUser()
 *          - getUserById()
 *          - getUserByEmail()
 *          - getUserByHandle()
 *          - login()
 * @return User information
 */

import keccak256 from "keccak256";
import "dotenv/config";
import { IUserService } from "@/services/IUserService";
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Patch,
  Path,
  Post,
  Route,
  Security,
} from "tsoa";
import { User } from "../entities/User";
import { sign } from "jsonwebtoken";
import { env } from "../config/config";
import { UserService } from "../services/impl/UserService";
import jwt from "jsonwebtoken";
import { decodeJWT, TokenInfo } from "@/middleware/authentication";

@Route("user")
export class UserController extends Controller {
  private readonly userService: IUserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Post("sign_up")
  public async createUser(
    @Body() body: { handle: string; password: string; email: string },
  ) {
    const { handle, password, email } = body;

    try {
      await this.userService.createUser({ handle, password, email });
      return { message: "User created successfully" };
    } catch (err) {
      throw new Error(`Error creating user: ${err}`);
    }
  }

  @Get('get-user-id-from-token')
  @Security("jwt", ["user"])
  public async getUserIdFromToken(
    @Header("x-access-token") token: string,
  ) : Promise<number | null> {
    try {
      const decoded: any = await new Promise((resolve, reject) => {
        jwt.verify(token, env.jwt_secret, (err: any, decoded: any) => {
          console.log(decoded);
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        });
      });
      this.setStatus(200);
      return decoded.id;
    } catch (err) {
      throw new Error(`Error verifying token: ${err}`);
    }  
  }

  @Get('id/{id}')
  @Security("jwt", ["user"])
  public async getUserById(@Path() id: number): Promise<User | null> {
    try {
      return await this.userService.getUserById(id);
    } catch (err) {
      throw new Error(`Error getting user: ${err}`);
    }
  }

  @Get("handle/{handle}")
  public async getUserByHandle(@Path() handle: string): Promise<User | null> {
    try {
      return await this.userService.getUserByHandle(handle);
    } catch (err) {
      throw new Error(`Error getting user: ${err}`);
    }
  }

  @Delete("{id}")
  public async deleteUser(@Path() id: string): Promise<void> {
    try {
      await this.userService.softDeleteUser(parseInt(id));
    } catch (err) {
      throw new Error(`Error delete user: ${err}`);
    }
  }

  @Patch()
  public async updateUserById(
    @Body() body: { handle: string; password: string; email: string },
    @Header("x-access-token") token: string,
  ) {
    try {
      const decoded: TokenInfo = await decodeJWT(token);
      
      await this.userService.updateUser(decoded.id, body);
      this.setStatus(200);
      return { message: "User updated successfully" };
    } catch (err) {
      throw new Error(`Error verifying token: ${err}`);
    }
  }

  @Patch("admin/{id}")
  @Security("jwt", ["admin"])
  public async addAdmin(@Path() id: number) {
    try {
      return await this.userService.updateUser(id, { role: "admin" });
    } catch (err) {
      throw new Error(`Error adding admin: ${err}`);
    }
  }

  @Post("login")
  public async login(@Body() body: { email: string; password: string }) {
    try {
      const { email, password } = body;
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        if (keccak256(password).toString("hex") === user.password) {
          const payload = { id: user.id, role: user.role };
          return sign(payload, env.jwt_secret, {
            expiresIn: "2days",
          });
        }
        throw new Error("Invalid password");
      }
      return null;
    } catch (err) {
      throw new Error(`Error login: ${err}`);
    }
  }
}
