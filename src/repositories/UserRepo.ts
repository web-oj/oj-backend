import { mysqlDataSource } from "../database/MysqlDataSource";
import { User } from "../entities/User";
import { Repository } from "typeorm";

export type IUserRepository = Repository<User> & {
  // some specific methods for this repository
};

export const UserRepository: IUserRepository = mysqlDataSource.getRepository(User).extend({
  // implement the specific methods here
})