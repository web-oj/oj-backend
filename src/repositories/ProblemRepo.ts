import {Repository} from "typeorm";
import {Problem} from "@/entities/Problem";
import {mysqlDataSource} from "@/database/MysqlDataSource";
import { IProblemRepository, ProblemQueryOptions } from "../types/types";


export const ProblemRepository: IProblemRepository = mysqlDataSource.getRepository(Problem).extend({
    async getProblem(options: ProblemQueryOptions): Promise<Problem | null> {
        const relations: string[] = [];
        if (options?.relations?.owner) {
            relations.push("owner");
        }
        if (options?.relations?.submissions) {
            relations.push("submissions");
        }
        if (options?.relations?.testcases) {
            relations.push("testcases");
        }
        if (options?.relations?.associatedContests) {
            relations.push("associatedContests");
        }
        return this.findOne({
            where: { ...options.query },
            relations,
            loadEagerRelations: true,
        })
    }
});