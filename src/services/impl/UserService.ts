import { User } from "../../entities/User";
import { IUserService } from "../IUserService";
import { UserRepository } from "../../repositories/UserRepo";
import keccak256 from "keccak256";
import { CreateUserInput, IUserRepository, Role } from "@/types/types";

export class UserService implements IUserService {
  private readonly userRepo: IUserRepository;

  constructor() {
    this.userRepo = UserRepository;
  }

  async createUser(userInput: CreateUserInput): Promise<User> {
    if (!userInput.handle || !userInput.email || !userInput.password) {
      throw new Error('Missing required fields');
    }
    if (userInput.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    if (!userInput.email.includes('@')) {
      throw new Error('Invalid email');
    } 
    if (userInput.handle.length < 3) {
      throw new Error('Handle must be at least 3 characters long');
    }
    if (userInput.handle.length > 20) {
      throw new Error('Handle must be at most 20 characters long');
    }
    if (userInput.password.length > 100) {
      throw new Error('Password must be at most 100 characters long');
    }
    if (userInput.email.length > 100) {
      throw new Error('Email must be at most 100 characters long');
    }
    const user = new User();
    user.handle = userInput.handle;
    user.email = userInput.email;
    user.password = keccak256(userInput.password).toString("hex");
    user.role = Role.User;
    user.isBan = false;
    user.submissions = [];
    try {
      await this.userRepo.insert(user);
    } catch (err) {
      throw new Error(`Error creating user: ${err}`);
    }
    return user;
  }

  async updateUser(id: number, updatedData: Partial<User>): Promise<User | null> {
    await this.userRepo.update(id, updatedData);
    return this.userRepo.findOneBy({ id });
  }

  async softDeleteUser(id: number): Promise<void> {
    await this.userRepo.softDelete(id);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepo.getUser({
      query: {
        id,
      },
      relations: ["problems", "submissions", "organizedContests", "participatedContest", "participatedContest.contest"],
    })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.getUser({
      query: {
        email,
      },
      relations: ["problems", "submissions", "organizedContests", "participatedContest", "participatedContest.contest"],
    });
  }

  async getUserByHandle(handle: string): Promise<User | null> {
    return this.userRepo.getUser({
      query: {
        handle,
      },
      relations: ["problems", "submissions", "organizedContests", "participatedContest", "participatedContest.contest"],
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async getLeaderboard(options: { limit: number; offset: number }): Promise<User[]> {
    const users = await this.getAllUsers();
    const sortedUsers = users.sort((a, b) => {
      return b.rating - a.rating;
    });
    return sortedUsers.slice(options.offset, options.offset + options.limit);
  }
}