import { User } from "@/entities/User";
import { CreateUserInput, IUserService } from "../IUserService";
import { IUserRepository, UserRepository } from "@/repositories/UserRepo";
import keccak256 from "keccak256";

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
    user.role = 'user';
    user.isBan = false;
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
    return this.userRepo.findOneBy({ id });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOneBy({ email });
  }

  async getUserByHandle(handle: string): Promise<User | null> {
    return this.userRepo.findOneBy({ handle });
  }
}