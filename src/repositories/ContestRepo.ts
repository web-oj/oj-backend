import { IContestRepository, ContestQueryOptions } from "../types/types";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { Contest } from "../entities/Contest";
import { Repository } from "typeorm";

export const ContestRepository: IContestRepository = mysqlDataSource.getRepository(Contest).extend({
  async getContest(options: ContestQueryOptions): Promise<Contest | null> {
    const relations: string[] = [];
    if (options?.relations?.problemsInContest) {
      relations.push("problemsInContest");
    }
    if (options?.relations?.participations) {
      relations.push("participations");
    }
    if (options?.relations?.submissions) {
      relations.push("submissions");
    }
    if (options?.relations?.organizer) {
      relations.push("organizer");
    }
    return this.findOne({
      where: { ...options.query },
      relations,
      loadEagerRelations: true,
    })
  }
})