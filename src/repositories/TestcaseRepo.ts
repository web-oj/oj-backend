import {Repository} from "typeorm";
import {mysqlDataSource} from "@/database/MysqlDataSource";
import { Testcase } from "@/entities/Testcase";
import { ITestcaseRepository } from "../types/types";

export const TestcaseRepository: ITestcaseRepository = mysqlDataSource.getRepository(Testcase).extend({

});