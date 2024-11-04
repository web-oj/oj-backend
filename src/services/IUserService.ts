import { User } from "../entities/User";

export type CreateUserInput = {
  handle: string;
  email: string;
  password: string;
};  

export interface IUserService {
  createUser(userInput: CreateUserInput): User;

  updateUser(id: number, updatedData: Partial<User>): Promise<User | null>;

  softDeleteUser(id: number): Promise<void>;

  getUserById(id: number): Promise<User | null>;

  getUserByEmail(email: string): Promise<User | null>;

  getUserByHandle(handle: string): Promise<User | null>;

  // getUserAchievements(id: number): Promise<string[]>;

  // getUserContestHistory(id: number): Promise<any[]>; 

  // getUserStats(id: number): Promise<{ rating: number; problemsSolved: number; contestsParticipated: number } | null>;
}
