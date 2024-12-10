import {
  IProblemService,
} from "@/services/IProblemService";
import { Problem } from "@/entities/Problem";
import {
  ProblemRepository,
} from "@/repositories/ProblemRepo";
import { UserRepository } from "@/repositories/UserRepo";
import {  TestcaseRepository } from "@/repositories/TestcaseRepo";
import { Testcase } from "@/entities/Testcase";
import { CreateProblemInput, IProblemRepository, ITestcaseRepository, IUserRepository } from "@/types/types";

export class ProblemService implements IProblemService {
  private readonly problemRepo: IProblemRepository;
  private readonly testcaseRepo: ITestcaseRepository;
  private readonly userRepo: IUserRepository;

  constructor() {
    this.problemRepo = ProblemRepository;
    this.testcaseRepo = TestcaseRepository;
    this.userRepo = UserRepository;
  }

  async createProblem(userInput: CreateProblemInput): Promise<Problem> {
    let problem = new Problem();

    if (!userInput.title || !userInput.statement) {
      throw new Error("Missing required fields");
    }
    problem.title = userInput.title;
    problem.statement = userInput.statement;

    if (!userInput.timeLimit || userInput.timeLimit <= 0) {
      throw new Error("Missing required fields");
    }
    if (!userInput.memoryLimit || userInput.memoryLimit <= 0) {
      throw new Error("Missing required fields");
    }
    if (userInput.difficulty) {
      if (userInput.difficulty <= 0) {
        throw new Error("Difficulty must be greater than 0");
      }
      problem.difficulty = userInput.difficulty;
    }
    problem.timeLimit = userInput.timeLimit;
    problem.memoryLimit = userInput.memoryLimit;

    problem.inputFormat = userInput.inputFormat
    problem.outputFormat = userInput.outputFormat
    problem.isPublished =
      userInput.isPublished !== undefined ? userInput.isPublished : false;

    const user = await this.userRepo.findOneBy({ id: userInput.creatorId });
    if (!user) {
      throw new Error("User not found");
    } 
    
    problem.owner = user;

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
    return this.problemRepo.getProblem({ query: { id } });
  }

  async getAllProblems(
    limit?: number,
    offset?: number,
    isPublished?: boolean,
  ): Promise<Problem[]> {
    return this.problemRepo.find({
      skip: offset,
      take: limit,
      where: { isPublished },
    });
  }

  async getProblemById(id: number): Promise<Problem | null> {
    return this.problemRepo.getProblem({ 
      query: { id }, 
      relations: {
        owner: true,
        testcases: true,
        submissions: true,
        associatedContests: true,
      } 
    });
  }

  async getProblemByTitle(title: string): Promise<Problem | null> {
    return this.problemRepo.getProblem({ 
      query: { title }, 
      relations: {
        owner: true,
        testcases: true,
        submissions: true,
        associatedContests: true,
      } 
    });
  }

  async searchProblems(
    searchKeyword?: string,
    difficultyLow?: number,
    difficultyHigh?: number,
    limit?: number,
    offset?: number,
  ): Promise<Problem[]> {
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
  
  async addTestcase(problemId: number, input: string, output: string) {
    const problem = await this.problemRepo.getProblem({
      query: { id: problemId },
    })
    if (!problem) {
      throw new Error("Problem not found");
    }
    const testcase = new Testcase();
    testcase.input = input;
    testcase.output = output;
    testcase.problem = problem;
    try {
      await this.testcaseRepo.save(testcase);
    } catch (error) {
      throw new Error(`Testcase adding error: ${error}`);
    }
  }
}
