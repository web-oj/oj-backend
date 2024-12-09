import {Repository} from "typeorm";
import {Problem} from "@/entities/Problem";
import {mysqlDataSource} from "@/database/MysqlDataSource";

export type IProblemRepository = Repository<Problem> & {
    getProblem(id: number, options?: {
        relations?: string[];
    }): Promise<Problem | null>;
}

export const ProblemRepository: IProblemRepository = mysqlDataSource.getRepository(Problem).extend({
    async getProblem(id: number, options?: { relations?: string[] }): Promise<Problem | null> {
        return this.findOne({
            where: { id },
            relations: options?.relations,
        })
    }
});