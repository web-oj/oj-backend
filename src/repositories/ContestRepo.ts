import { mysqlDataSource } from "../database/MysqlDataSource";
import { Contest } from "../entities/Contest";
import { Repository } from "typeorm";

export type IContestRepository = Repository<Contest> & {
  // some specific methods for this repository
};

export const ContestRepository: IContestRepository = mysqlDataSource.getRepository(Contest).extend({
  // implement the specific methods here
})