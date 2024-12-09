import {Repository} from "typeorm";
import {Problem} from "@/entities/Problem";
import {mysqlDataSource} from "@/database/MysqlDataSource";
import { IProblemRepository } from "../types/types";


export const ProblemRepository: IProblemRepository = mysqlDataSource.getRepository(Problem).extend({
    async getProblem(id: number, options?: { relations?: string[] }): Promise<Problem | null> {
        return this.findOne({
            where: { id },
            relations: options?.relations,
        })
    }
});