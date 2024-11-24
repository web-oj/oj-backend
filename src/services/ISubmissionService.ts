import { Problem } from "@/entities/Problem";
import { Submission } from "@/entities/Submission";

export interface ISubmissionService {
  submit(userId: number, problem: Problem, code: string): Promise<void>;

  getAllSubmissions(userId: number): Promise<Submission[]>;
}
