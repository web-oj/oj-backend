import { IUserRepository, UserQueryOptions } from "../types/types";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { User } from "../entities/User";
import { Repository } from "typeorm";

export const UserRepository: IUserRepository = mysqlDataSource.getRepository(User).extend({
  async getUser(options: UserQueryOptions): Promise<User | null> {
    const relations: string[] = [];
    if (options?.relations?.problems) {
      relations.push("problems");
    }
    if (options?.relations?.submissions) {
      relations.push("submissions");
    }
    if (options?.relations?.organizedContests) {
      relations.push("organizedContests");
    }
    if (options?.relations?.participatedContest) {
      relations.push("participatedContest");
    }
    return this.findOne({
      where: { ...options.query },
      relations,
      loadEagerRelations: true,
    })
  }
})