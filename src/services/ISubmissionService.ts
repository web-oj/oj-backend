import { Contest } from "@/entities/Contest";
import { Problem } from "@/entities/Problem";
import { Submission } from "@/entities/Submission";

export interface ISubmissionService {
  submit(userId: number, problemId: number, code: string, contestId?: number) : Promise<{ submissionId: number }>;

  getSubmissionById(submissionId: number, options?: {
    withResult?: boolean;
  }): Promise<Submission | null>;

  executeSubmission(submissionId: number): Promise<void>;

  executeCode(code: string, stdin: string, expectedOutput?: string): Promise<string>;
}
