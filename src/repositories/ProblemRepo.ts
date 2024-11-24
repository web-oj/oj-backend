import {Repository} from "typeorm";
import {Problem} from "@/entities/Problem";
import {mysqlDataSource} from "@/database/MysqlDataSource";

export type IProblemRepository = Repository<Problem> & {

}

export const ProblemRepository: IProblemRepository = mysqlDataSource.getRepository(Problem).extend({

});