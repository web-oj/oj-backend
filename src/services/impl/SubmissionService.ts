import { Submission } from "@/entities/Submission";
import { ISubmissionService } from "../ISubmissionService";
import { ISubmissionRepository, SubmissionRepository } from "@/repositories/SubmissionRepo";
import { IUserRepository, UserRepository } from "@/repositories/UserRepo";
import { Problem } from "@/entities/Problem";

export class SubmissionService implements ISubmissionService {
  private readonly userRepo: IUserRepository;
  private readonly submissionRepo: ISubmissionRepository;

  constructor() {
    this.userRepo = UserRepository;
    this.submissionRepo = SubmissionRepository;
  }

  async submit(userId: number, problem: Problem, code: string): Promise<void> {
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
    } catch (err) {
      throw new Error(`Error creating submission: ${err}`);
    }
  }

  async getAllSubmissions(userId: number): Promise<Submission[]> {
    return this.submissionRepo.findBy({ owner: { id: userId } });
  }
}