import { Submission } from "@/entities/Submission";
import { ISubmissionService } from "../ISubmissionService";
import { SubmissionRepository } from "@/repositories/SubmissionRepo";
import { UserRepository } from "@/repositories/UserRepo";
import { Problem } from "@/entities/Problem";
import { env } from "@/config/config";
import axios from "axios";
import { SubmissionResult } from "@/entities/SubmissionResult";
import { Contest } from "@/entities/Contest";
import { SubmissionResultRepository } from "@/repositories/SubmissionResultRepo";
import { IContestRepository, IProblemRepository, ISubmissionRepository, ISubmissionResultRepository, IUserRepository } from "../../types/types";
import { ProblemRepository } from "@/repositories/ProblemRepo";
import { ContestRepository } from "@/repositories/ContestRepo";

export class SubmissionService implements ISubmissionService {
  private readonly userRepo: IUserRepository;
  private readonly submissionRepo: ISubmissionRepository;
  private readonly submissionResultRepo: ISubmissionResultRepository;
  private readonly problemRepo: IProblemRepository;
  private readonly contestRepo: IContestRepository;

  constructor() {
    this.userRepo = UserRepository;
    this.submissionRepo = SubmissionRepository;
    this.submissionResultRepo = SubmissionResultRepository;
    this.problemRepo = ProblemRepository;
    this.contestRepo = ContestRepository;
  }

  async submit(userId: number, problemId: number, code: string, contestId?: number) {
    if (!userId || !code) {
      throw new Error('Missing required fields');
    }
    const problem = await this.problemRepo.getProblem({
      query: { id: problemId },
      relations: { testcases: true },
    });
    if (!problem) {
      throw new Error('Problem not found');
    }
    const user = await this.userRepo.getUser({
      query: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (code.length > 1000) {
      throw new Error('Code must be at most 1000 characters long');
    }
    const submission = new Submission();
    if (contestId) {
      const contest = await this.contestRepo.getContest({
        query: { id: contestId },
      })
      if (!contest) {
        throw new Error('Contest not found');
      }
      if (contest.startTime > Date.now()) {
        throw new Error('Contest has not started yet');
      }
      if (contest.endTime < Date.now()) {
        throw new Error('Contest has ended');
      }
      submission.contest = contest;
    }
    submission.owner = user;
    submission.problem = problem;
    submission.code = code;
    submission.language = 'CPP';
    submission.result = [];
    try {
      await this.userRepo.save(user);
      await this.submissionRepo.save(submission);
      await this.executeSubmission(submission.id);
      return {
        submissionId: submission.id,
      }
    } catch (err) {
      throw new Error(`Error creating submission: ${err}`);
    }  
  }

  async executeCode(code: string, stdin: string, expectedOutput?: string): Promise<string> {
    stdin = Buffer.from(stdin).toString('base64');
    if (expectedOutput) {
      expectedOutput = Buffer.from(expectedOutput).toString('base64');
    }
    const options = {
      method: 'POST',
      path: 'submissions/?base64_encoded=true&wait=true',
      headers: {
        'x-rapidapi-key': env.judge0.apiKey,
        'x-rapidapi-host': env.judge0.hostName,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ source_code: code, language_id: 53, stdin, expected_output: expectedOutput }),
    }
    try {
      const res = await axios.post(`https://${env.judge0.hostName}/${options.path}`, options.body, {
        headers: options.headers
      });
      console.log(res);
      return res.data.status.description;
    } catch (err) {
      throw new Error(`Error executing code: ${err}`);
    }
  }

  async executeSubmission(submissionId: number) {
    const submission = await this.submissionRepo.findOne(
      {
        where: { id: submissionId },
        relations: ['problem', 'problem.testcases'],
      }
    );
    if (!submission) {
      throw new Error('Submission not found');
    }
    const problem = submission.problem;
    if (problem.testcases) {
      for (const test of problem.testcases) {
        if (test.input === undefined || test.output === undefined) {
          continue;
        }
        if (test.input.length > 1000 || test.output.length > 1000) {
          continue;
        }
        const submissionResult = new SubmissionResult();
        submissionResult.testcase = test;
        submissionResult.submission = submission;
        submissionResult.result = (await this.executeCode(submission.code, test.input, test.output));
        this.submissionResultRepo.save(submissionResult);
      }
    }    
  }

  async getSubmissionById(submissionId: number, options?: {
    withResult: boolean;
  }): Promise<Submission | null> {
    return this.submissionRepo.findOne({
      where: { id: submissionId },
      relations: options?.withResult ? ['result'] : [],
      loadEagerRelations: true,
    })
  }
}