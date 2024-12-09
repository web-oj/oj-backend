import { Submission } from "@/entities/Submission";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { Repository } from "typeorm";
import { ISubmissionRepository } from "../types/types";

export const SubmissionRepository: ISubmissionRepository = mysqlDataSource.getRepository(Submission).extend({
  // implement the specific methods here
})