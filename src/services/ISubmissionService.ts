import { Problem } from "@/entities/Problem";
import { Submission } from "@/entities/Submission";

export interface ISubmissionService {
  submit(userId: number, problem: Problem, code: string): Promise<number>;

  executeSubmission(submissionId: number): Promise<string>;

  executeCode(code: string, stdin: string): Promise<string>;

  getAllSubmissions(userId: number): Promise<Submission[]>;
}
