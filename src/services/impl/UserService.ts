import { User } from "../../entities/User";
import { CreateUserInput, IUserService } from "../IUserService";
import { IUserRepository, UserRepository } from "../../repositories/UserRepo";

export class UserService implements IUserService {
  private readonly userRepo: IUserRepository;
  constructor() {
    this.userRepo = UserRepository;
  }
  createUser(userInput: CreateUserInput): User {
    const user = new User();
    user.handle = userInput.handle;
    user.email = userInput.email;
    user.password = userInput.password;
    user.role = 'user';
    user.isBan = false;
    this.userRepo.save(user);
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