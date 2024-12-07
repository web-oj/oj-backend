import { Problem } from "@/entities/Problem";

export type CreateProblemInput = {
  title: string;
  statement: string;
  difficulty: number;
  timeLimit: number;
  memoryLimit: number;
  inputFormat?: string;
  outputFormat?: string;
  solutionText?: string;
  isPublished?: boolean;
  creatorId: number;
};

export interface IProblemService {
  createProblem(userInput: CreateProblemInput): Promise<Problem>;

  editProblem(
    id: number,
    updatedData: Partial<Problem>,
  ): Promise<Problem | null>;

  softDeleteProblem(id: number): Promise<void>;

  getProblemById(id: number): Promise<Problem | null>;

  getAllProblems(limit?: number, offset?: number): Promise<Problem[] | null>;

  getProblemByTitle(title: string): Promise<Problem | null>;

  searchProblems(
      searchKeyword?: string,
      difficultyLow?: number,
      difficultyHigh?: number,
      limit?: number,
      offset?: number
  ): Promise<Problem[] | null>;

  addTestcase(
    problemId: number,
    input: string,
    output: string,
  ): Promise<void>;
}
