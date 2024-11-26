import { mysqlDataSource } from "../database/MysqlDataSource";
import { ContestParticipation } from "../entities/ContestParticipation";
import { Repository } from "typeorm";

export type IContestParticipationRepository =
  Repository<ContestParticipation> & {
    // some specific methods for this repository
  };

export const ContestParticipationRepository: IContestParticipationRepository =
  mysqlDataSource.getRepository(ContestParticipation).extend({
    // implement the specific methods here
  });
