import { Submission } from "@/entities/Submission";
import { mysqlDataSource } from "../database/MysqlDataSource";
import { Repository } from "typeorm";
import { SubmissionResult } from "@/entities/SubmissionResult";
import { ISubmissionResultRepository } from "../types/types";

export const SubmissionResultRepository: ISubmissionResultRepository = mysqlDataSource.getRepository(SubmissionResult).extend({
  // implement the specific methods here
})