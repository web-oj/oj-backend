import { mysqlDataSource } from "../database/MysqlDataSource";
import { ProblemInContest } from "../entities/ProblemInContest";
import { Repository } from "typeorm";

export type IProblemInContestRepository =
  Repository<ProblemInContest> & {
    // some specific methods for this repository
  };

export const ProblemInContestRepository: IProblemInContestRepository =
  mysqlDataSource.getRepository(ProblemInContest).extend({
    // implement the specific methods here
  });
