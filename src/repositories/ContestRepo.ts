import { IContestRepository, ContestQueryOptions } from "../types/types";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { Contest } from "../entities/Contest";

export const ContestRepository: IContestRepository = mysqlDataSource.getRepository(Contest).extend({
  async getContest(options: ContestQueryOptions): Promise<Contest | null> {
    return this.findOne({
      where: { ...options.query },
      relations: options.relations,
      loadEagerRelations: true,
    })
  }
})