import {
  CreateProblemInput,
  IProblemService,
} from "@/services/IProblemService";
import { Problem } from "@/entities/Problem";
import {
  IProblemRepository,
  ProblemRepository,
} from "@/repositories/ProblemRepo";
import { UserRepository } from "@/repositories/UserRepo";

export class ProblemService implements IProblemService {
  private readonly problemRepo: IProblemRepository;

  constructor() {
    this.problemRepo = ProblemRepository;
  }

  async createProblem(userInput: CreateProblemInput): Promise<Problem> {
    let problem = new Problem();

    if (!userInput.title || !userInput.statement) {
      throw new Error("Missing required fields");
    }
    problem.title = userInput.title;
    problem.statement = userInput.statement;

    if (!userInput.difficulty || userInput.difficulty <= 0) {
      throw new Error("Missing required fields");
    }
    if (!userInput.timeLimit || userInput.timeLimit <= 0) {
      throw new Error("Missing required fields");
    }
    if (!userInput.memoryLimit || userInput.memoryLimit <= 0) {
      throw new Error("Missing required fields");
    }
    problem.difficulty = userInput.difficulty;
    problem.timeLimit = userInput.timeLimit;
    problem.memoryLimit = userInput.memoryLimit;

    problem.inputFormat =
      userInput.inputFormat !== undefined ? userInput.inputFormat : "stdin";
    problem.outputFormat =
      userInput.outputFormat !== undefined ? userInput.outputFormat : "stdout";
    problem.isPublished =
      userInput.isPublished !== undefined ? userInput.isPublished : false;
    problem.createdBy = userInput.creatorId;

    try {
      await this.problemRepo.save(problem);
    } catch (error) {
      throw new Error(`Problem creating error: ${error}`);
    }
    return problem;
  }

  async editProblem(
    id: number,
    updatedData: Partial<Problem>,
  ): Promise<Problem | null> {
    await this.problemRepo.update(id, updatedData);
    return this.problemRepo.findOneBy({ id });
  }

  async getAllProblems(
    limit?: number,
    offset?: number,
  ): Promise<Problem[] | null> {
    return this.problemRepo.find({
      skip: offset,
      take: limit,
    });
  }

  async getProblemById(id: number): Promise<Problem | null> {
    return this.problemRepo.findOneBy({ id });
  }

  async getProblemByTitle(title: string): Promise<Problem | null> {
    return this.problemRepo.findOneBy({ title });
  }

  async searchProblems(
    searchKeyword?: string,
    difficultyLow?: number,
    difficultyHigh?: number,
    limit?: number,
    offset?: number,
  ): Promise<Problem[] | null> {
    if (searchKeyword !== undefined) {
      return this.problemRepo
        .createQueryBuilder()
        .select()
        .where(
          `MATCH(title) AGAINST ('${searchKeyword}' IN NATURAL LANGUAGE MODE)`,
        )
        .andWhere(`difficulty BETWEEN ${difficultyLow} AND ${difficultyHigh}`)
        .orderBy("title", "ASC")
        .skip(offset)
        .take(limit)
        .getMany();
    } else {
      return this.problemRepo
        .createQueryBuilder()
        .select()
        .where(`difficulty BETWEEN ${difficultyLow} AND ${difficultyHigh}`)
        .orderBy("title", "ASC")
        .skip(offset)
        .take(limit)
        .getMany();
    }
  }

  async softDeleteProblem(id: number): Promise<void> {
    await this.problemRepo.softDelete(id);
  }
}
