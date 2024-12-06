import { Submission } from "@/entities/Submission";
import { ISubmissionService } from "../ISubmissionService";
import { ISubmissionRepository, SubmissionRepository } from "@/repositories/SubmissionRepo";
import { IUserRepository, UserRepository } from "@/repositories/UserRepo";
import { Problem } from "@/entities/Problem";
import { env } from "@/config/config";
import axios from "axios";
import { SubmissionResult } from "@/entities/SubmissionResult";

export class SubmissionService implements ISubmissionService {
  private readonly userRepo: IUserRepository;
  private readonly submissionRepo: ISubmissionRepository;
  private readonly submissionResultRepo: ISubmissionRepository;

  constructor() {
    this.userRepo = UserRepository;
    this.submissionRepo = SubmissionRepository;
    this.submissionResultRepo = SubmissionRepository;
  }

  async submit(userId: number, problem: Problem, code: string): Promise<number> {
    if (!userId || !code) {
      throw new Error('Missing required fields');
    }
    if (problem.id === undefined) {
      throw new Error('Problem ID is required');
    }
    if (code.length > 1000) {
      throw new Error('Code must be at most 1000 characters long');
    }
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const submission = new Submission();
    submission.owner = user;
    submission.problem = problem;
    submission.code = code;
    if (user.submissions === undefined) {
      user.submissions = [];
    }
    user.submissions.push(submission);
    try {
      await this.userRepo.save(user);
      await this.submissionRepo.save(submission);
      return submission.id;
    } catch (err) {
      throw new Error(`Error creating submission: ${err}`);
    }
  }

  async executeCode(code: string, stdin: string): Promise<string> {
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
    const submission = await this.submissionRepo.findOneBy({ id: submissionId });
    if (!submission) {
      throw new Error('Submission not found');
    }
    const problem = submission.problem;
    for (const test of problem.testcases) {
      if (test.input === undefined || test.output === undefined) {
        throw new Error('Testcase input and output are required');
      }
      if (test.input.length > 1000 || test.output.length > 1000) {
        throw new Error('Testcase input and output must be at most 1000 characters long');
      }
      const submissionResult = new SubmissionResult();
      submissionResult.testcase = test;
      submissionResult.submission = submission;
      submissionResult.result = await this.executeCode(submission.code, test.input);
      this.submissionResultRepo.save(submissionResult);
    }
  }

  async getAllSubmissions(userId: number): Promise<Submission[]> {
    return this.submissionRepo.findBy({ owner: { id: userId } });
  }
}