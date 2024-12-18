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
  Query,
  Route,
  Security,
  Tags,
} from "tsoa";
import { User } from "../entities/User";
import { sign } from "jsonwebtoken";
import { env } from "../config/config";
import { UserService } from "../services/impl/UserService";
import jwt from "jsonwebtoken";
import { decodeJWT } from "@/middleware/authentication";
import { ApiResponse, CreateNewUserRequest, GetUserIdFromTokenResponse, GetUserResponse, GetUserRoleFromTokenResponse, LoginRequest, LoginResponse, Role, TokenInfo, UpdateUserRequest } from "../types/types";
import { signToken, signUserToken, validatePassword } from "@/utils/utils";

@Route("user")
export class UserController extends Controller {
  private readonly userService: IUserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Post("")
  @Tags("User")
  public async createUser(
    @Body() body: CreateNewUserRequest,
  ): Promise<ApiResponse<null>> {
    const { handle, password, email } = body;

    try {
      await this.userService.createUser({ handle, password, email });
      this.setStatus(200);
      return {
        message: "User created successfully",
        status: 200,
      }
    } catch (err) {
      this.setStatus(400);
      return { 
        message: "User not created",
        status: 400,
        error: `Error creating user: ${err}`,
      }
    }
  }

  @Get('/id')
  @Tags("User")
  @Security("jwt", [Role.User])
  public async getUserIdFromToken(
    @Header("x-access-token") token: string,
  ): Promise<ApiResponse<GetUserIdFromTokenResponse>> {
    try {
      const decoded = await decodeJWT(token);
      this.setStatus(200);
      return {
        status: 200,
        message: "User ID retrieved successfully",
        data: {
          id: decoded.id,
        },
      };
    } catch (err) {
      this.setStatus(400);
      return { 
        status: 400,
        message: "User ID not retrieved",
        error: `Error verifying token: ${err}`,
      };
    }  
  }

  @Get('/role')
  @Tags("User")
  @Security("jwt", [Role.User])
  public async getUserRoleFromToken(
    @Header("x-access-token") token: string,
  ): Promise<ApiResponse<GetUserRoleFromTokenResponse>> {
    try {
      const decoded = await decodeJWT(token);
      this.setStatus(200);
      return {
        status: 200,
        message: "User role retrieved successfully",
        data: {
          role: decoded.role,
        }
      };
    } catch (err) {
      const error = `Error verifying token: ${err}`;
      this.setStatus(400);
      return {
        status: 400,
        message: "User role not retrieved",
        error,
      }
    }
  }

  @Get('{id}')
  @Tags("User")
  @Security("jwt", [Role.User])
  public async getUserById(@Path() id: number): Promise<ApiResponse<GetUserResponse>> {
    try {
      const user = await this.userService.getUserById(id);
      this.setStatus(200);
      return {
        status: 200,
        message: "User retrieved successfully",
        data: user,
      }
    } catch (err) {
      this.setStatus(400);
      return {
        status: 400,
        message: "User not retrieved",
        error: `Error getting user: ${err}`,
      }
    }
  }

  @Get("handle/{handle}")
  @Tags("User")
  public async getUserByHandle(@Path() handle: string): Promise<ApiResponse<GetUserResponse>> {
    try {
      const user = await this.userService.getUserByHandle(handle);
      this.setStatus(200);
      return {
        status: 200,
        message: "User retrieved successfully",
        data: user,
      }
    } catch (err) {
      this.setStatus(400);
      return {
        status: 400,
        message: "User not retrieved",
        error: `Error getting user: ${err}`,
      }
    }
  }

  @Delete("id/{id}")
  @Tags("User")
  public async deleteUser(@Path() id: number): Promise<ApiResponse<null>> {
    try {
      await this.userService.softDeleteUser(id);
      this.setStatus(200);
      return {
        status: 200,
        message: "User deleted successfully",
      }
    } catch (err) {
      this.setStatus(400);
      return {
        status: 400,
        message: "User not deleted",
        error: `Error deleting user: ${err}`,
      }
    }
  }

  @Patch()
  @Tags("User")
  public async updateUserById(
    @Body() body: UpdateUserRequest,
    @Header("x-access-token") token: string,
  ): Promise<ApiResponse<null>> {
    try {
      const decoded: TokenInfo = await decodeJWT(token);
      
      await this.userService.updateUser(decoded.id, body);
      this.setStatus(200);
      return { 
        message: "User updated successfully", 
        status: 200,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        message: "User not updated",
        status: 400,
        error: `Error updating user: ${err}`,
      }
    }
  }

  @Patch("admin/{id}")
  @Tags("User")
  @Security("jwt", [Role.Admin])
  public async addAdmin(@Path() id: number): Promise<ApiResponse<null>> {
    try {
      await this.userService.updateUser(id, { role: Role.Admin });
      this.setStatus(200);
      return {
        status: 200,
        message: "Admin added successfully",
      }
    } catch (err) {
      this.setStatus(400);
      return {
        status: 400,
        message: "Admin not added",
        error: `Error adding admin: ${err}`,
      }
    }
  }

  @Post("login")
  @Tags("User")
  public async login(@Body() body: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const { email, password, handle } = body;
      if (!email && !handle) {
        this.setStatus(400);
        return {
          error: "Email or handle is required",
          message: "Login failed",
          status: 400,
        }
      }
      if (email) {
        const user = await this.userService.getUserByEmail(email);
        if (user) {
          if (validatePassword(password, user)) {
            this.setStatus(200);
            return {
              status: 200,
              message: "Login successful",
              data: {
                token: signUserToken(user)
              },
            }
          } else {
            this.setStatus(400);
            return {
              status: 400,
              message: "Login failed",
              error: "Invalid password",
            }
          }
        } else {
          this.setStatus(400);
          return {
            status: 400,
            message: "Login failed",
            error: "User not found",
          }
        } 
      }
      if (handle) {
        const user = await this.userService.getUserByHandle(handle);
        if (user) {
          if (validatePassword(password, user)) {
            this.setStatus(200);
            return {
              status: 200,
              message: "Login successful",
              data: {
                token: signUserToken(user),
              }
            }
          } else {
            this.setStatus(400);
            return {
              status: 400,
              message: "Login failed",
              error: "Invalid password",
            }
          }
        } else {
          this.setStatus(400);
          return {
            status: 400,
            message: "Login failed",
            error: "User not found",
          }
        }
      }
      this.setStatus(400);
      return {
        status: 400,
        message: "Login failed",
        error: "User not found",
      }
    } catch (err) {
      this.setStatus(400);
      return {
        status: 400,
        message: "Login failed",
        error: `Error logging in: ${err}`,
      }
    }
  }

  @Get("leaderboard")
  @Tags("User")
  public async getLeaderboard(
    @Query() limit: number = 10, offset: number = 0
  ): Promise<ApiResponse<User[]>> {
    try {
      const users = await this.userService.getLeaderboard({
        limit,
        offset,
      });
      this.setStatus(200);
      return {
        status: 200,
        message: "Leaderboard retrieved successfully",
        data: users,
      }
    } catch (err) {
      this.setStatus(400);
      return {
        status: 400,
        message: "Leaderboard not retrieved",
        error: `Error getting leaderboard: ${err}`,
      }
    }
  }
}
