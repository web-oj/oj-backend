import { User } from "@/entities/User"; 
import { CreateUserInput } from "../types/types";

export interface IUserService {
  createUser(userInput: CreateUserInput): Promise<User>;

  updateUser(id: number, updatedData: Partial<User>): Promise<User | null>;

  softDeleteUser(id: number): Promise<void>;

  getUserById(id: number): Promise<User | null>;

  getUserByEmail(email: string): Promise<User | null>;

  getUserByHandle(handle: string): Promise<User | null>;

  getAllUsers(): Promise<User[]>;

  getLeaderboard(options: {
    limit: number;
    offset: number
  }): Promise<User[]>;
}
