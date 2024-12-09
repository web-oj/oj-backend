import { IContestParticipationRepository } from "../types/types";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { ContestParticipation } from "../entities/ContestParticipation";
import { Repository } from "typeorm";

export const ContestParticipationRepository: IContestParticipationRepository =
  mysqlDataSource.getRepository(ContestParticipation).extend({
    // implement the specific methods here
  });
