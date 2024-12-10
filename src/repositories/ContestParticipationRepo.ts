import { IContestParticipationRepository, ContestParticipationQueryOptions } from "../types/types";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { ContestParticipation } from "../entities/ContestParticipation";
import { Repository } from "typeorm";

export const ContestParticipationRepository: IContestParticipationRepository =
  mysqlDataSource.getRepository(ContestParticipation).extend({
      getContestParticipation(options: ContestParticipationQueryOptions): Promise<ContestParticipation | null> {
        return this.findOne({
          where: { ...options.query },
          relations: ["contest", "user"],
          loadEagerRelations: true,
        })
      },

      getContestParticipations(options: ContestParticipationQueryOptions): Promise<ContestParticipation[]> {
        const relations: string[] = [];
        return this.find({
          where: { ...options.query },
          relations: ["contest", "user"],
          loadEagerRelations: true,
        })
      }
  });
