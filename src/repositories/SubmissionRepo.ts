import { Submission } from "@/entities/Submission";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { Repository } from "typeorm";

export type ISubmissionRepository = Repository<Submission> & {
  // some specific methods for this repository
};

export const SubmissionRepository: ISubmissionRepository = mysqlDataSource.getRepository(Submission).extend({
  // implement the specific methods here
})