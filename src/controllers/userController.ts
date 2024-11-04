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
 *          - logout()
 * @return Express JSON Response
 */

import keccak256 from "keccak256";
import "dotenv/config";
import { IUserService } from "@/services/IUserService";
import { Body, Get, Path, Post, Route } from "tsoa";
import { User } from "../entities/User";

@Route("user")
export class UserController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  @Post("createUser")
  public async createUser(
    @Body() body: { handle: string; password: string; email: string }
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
  public async getUserById(
    @Path() id: number
  ): Promise<User | null> {
    try {
      const user = await this.userService.getUserById(id);
      return user;
    } catch (err) {
      throw new Error(`Error getting user: ${err}`);
    }
  }

  @Get("{handle}")
  public async getUserByHandle(
    @Path() handle: string
  ): Promise<User | null> {
    try {
      const user = await this.userService.getUserByHandle(handle);
      return user;
    } catch (err) {
      throw new Error(`Error getting user: ${err}`);
    }
  }
}
