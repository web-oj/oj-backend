import { Problem } from "@/entities/Problem";
import { CreateProblemInput } from "../types/types";

export interface IProblemService {
  createProblem(userInput: CreateProblemInput): Promise<Problem>;

  editProblem(
    id: number,
    updatedData: Partial<Problem>,
  ): Promise<Problem | null>;

  softDeleteProblem(id: number): Promise<void>;

  getProblemById(id: number): Promise<Problem | null>;

  getAllProblems(limit?: number, offset?: number, isPublished?: boolean): Promise<Problem[]>;

  getProblemByTitle(title: string): Promise<Problem | null>;

  searchProblems(
      searchKeyword?: string,
      difficultyLow?: number,
      difficultyHigh?: number,
      limit?: number,
      offset?: number
  ): Promise<Problem[]>;

  addTestcase(
    problemId: number,
    input: string,
    output: string,
  ): Promise<void>;
}
