import { Submission } from "@/entities/Submission";

export interface ISubmissionService {
  submit(userId: number, problem: string, code: string): Promise<void>;

  getAllSubmissions(userId: number): Promise<Submission[]>;
}
