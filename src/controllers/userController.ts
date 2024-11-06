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
import { Body, Delete, Get, Patch, Path, Post, Route } from "tsoa";
import { User } from "@/entities/User";
import { sign } from "jsonwebtoken";
import { env } from "@/config/config";

@Route("user")
export class UserController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  @Post("createUser")
  public async createUser(
    @Body() body: { handle: string; password: string; email: string },
  ) {
    const { handle, password, email } = body;
    const hashedPassword = keccak256(password).toString();

    try {
      this.userService.createUser({ handle, password: hashedPassword, email });
      return { message: "User created successfully" };
    } catch (err) {
      throw new Error(`Error creating user: ${err}`);
    }
  }

  @Get("{id}")
  public async getUserById(@Path() id: number): Promise<User | null> {
    try {
      return await this.userService.getUserById(id);
    } catch (err) {
      throw new Error(`Error getting user: ${err}`);
    }
  }

  @Get("{handle}")
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

  @Patch("{id}")
  public async updateUser(
    @Path() id: number,
    @Body() body: { handle: string; password: string; email: string },
  ) {
    try {
      return await this.userService.updateUser(id, body);
    } catch (err) {
      throw new Error(`Error updating user: ${err}`);
    }
  }

  @Patch("admin/{id}")
  public async addAdmin(@Path() id: number) {
    try {
      return await this.userService.updateUser(id, { role: "admin" });
    } catch (err) {
      throw new Error(`Error adding admin: ${err}`);
    }
  }

  @Post("login")
  public async login(@Body() body: { password: string; email: string }) {
    try {
      const { password, email } = body;
      const user = await this.userService.getUserByEmail(email);

      if (user) {
        if (keccak256(password).toString("hex") === user.password) {
          return sign(user, env.jwt_secret, {
            expiresIn: "maxAge",
          });
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Error login: ${err}`);
    }
  }
}
