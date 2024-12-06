import { Submission } from "@/entities/Submission";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { Repository } from "typeorm";
import { SubmissionResult } from "@/entities/SubmissionResult";

export type ISubmissionResultRepository = Repository<SubmissionResult> & {
  // some specific methods for this repository
};

export const SubmissionRepository: ISubmissionResultRepository = mysqlDataSource.getRepository(SubmissionResult).extend({
  // implement the specific methods here
})