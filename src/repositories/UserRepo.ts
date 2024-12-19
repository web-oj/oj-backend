import { IUserRepository, UserQueryOptions } from "../types/types";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { User } from "../entities/User";
import { Repository } from "typeorm";

export const UserRepository: IUserRepository = mysqlDataSource.getRepository(User).extend({
  async getUser(options: UserQueryOptions): Promise<User | null> {
    return this.findOne({
      where: { ...options.query },
      relations: options.relations,
      loadEagerRelations: true,
    })
  }
})