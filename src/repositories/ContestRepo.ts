import { IContestRepository } from "../types/types";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { Contest } from "../entities/Contest";
import { Repository } from "typeorm";

export const ContestRepository: IContestRepository = mysqlDataSource.getRepository(Contest).extend({
  // implement the specific methods here
})