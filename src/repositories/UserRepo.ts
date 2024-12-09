import { IUserRepository } from "../types/types";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { User } from "../entities/User";
import { Repository } from "typeorm";

export const UserRepository: IUserRepository = mysqlDataSource.getRepository(User).extend({
  // implement the specific methods here
})