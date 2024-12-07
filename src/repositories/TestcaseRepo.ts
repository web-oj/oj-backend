import {Repository} from "typeorm";
import {mysqlDataSource} from "@/database/MysqlDataSource";
import { Testcase } from "@/entities/Testcase";

export type ITestcaseRepository = Repository<Testcase> & {

}

export const TestcaseRepository: ITestcaseRepository = mysqlDataSource.getRepository(Testcase).extend({

});