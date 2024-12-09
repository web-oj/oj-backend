import { IProblemInContestRepository } from "../types/types";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { ProblemInContest } from "../entities/ProblemInContest";
import { Repository } from "typeorm";


export const ProblemInContestRepository: IProblemInContestRepository =
  mysqlDataSource.getRepository(ProblemInContest).extend({
    // implement the specific methods here
  });
