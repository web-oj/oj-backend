import { IProblemInContestRepository, ProblemInContestQueryOptions } from "../types/types";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { ProblemInContest } from "../entities/ProblemInContest";
import { Repository } from "typeorm";


export const ProblemInContestRepository: IProblemInContestRepository = mysqlDataSource.getRepository(ProblemInContest).extend({
  getProblemInContest(options: ProblemInContestQueryOptions): Promise<ProblemInContest | null> {
    return this.findOne({
      where: { ...options.query },
      relations: ["problem", "contest"],
      loadEagerRelations: true,
    })
  }
});
