import { env } from "@/config/config";
import { IExecutorService } from "../IExecutorService";
import axios from "axios";
import { ISubmissionRepository, SubmissionRepository } from "@/repositories/SubmissionRepo";
import { IUserRepository, UserRepository } from "@/repositories/UserRepo";

export class ExecutorService implements IExecutorService {
  private readonly submissionRepo: ISubmissionRepository;
  private readonly userRepo: IUserRepository;

  constructor() {
    this.submissionRepo = SubmissionRepository;
    this.userRepo = UserRepository;
  }

  async executeCode(code: string, language: string, stdin: string): Promise<string> {
    const options = {
      method: 'POST',
      path: 'submissions/?base64_encoded=true&wait=true',
      headers: {
        'x-rapidapi-key': env.judge0.apiKey,
        'x-rapidapi-host': env.judge0.hostName,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ source_code: code, language_id: 53, stdin }),
    }
    try {
      const res = await axios.post(`https://${env.judge0.hostName}/${options.path}`, options.body, {
        headers: options.headers
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error(`Error executing code: ${err}`);
    }
  }

  async executeSubmission(submissionId: number): Promise<string> {
    const submission = await this.submissionRepo.findOneBy({ id:
      submissionId });
    if (!submission) {
      throw new Error('Submission not found');
    }
    return await this.executeCode(submission.code, submission.language, "1");
  }
} 