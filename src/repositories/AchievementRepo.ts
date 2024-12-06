import { mysqlDataSource } from "../database/MysqlDataSource";
import { Achievement } from "../entities/Achievement";
import { Repository } from "typeorm";

export type IAchievementRepository = Repository<Achievement> & {
  // some specific methods for this repository
};

export const AchievementRepository: IAchievementRepository = mysqlDataSource.getRepository(Achievement).extend({
  // implement the specific methods here
})