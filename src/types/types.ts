import "reflect-metadata";
import { Contest } from "../entities/Contest";
import { ContestParticipation } from "../entities/ContestParticipation";
import { Problem } from "@/entities/Problem";
import { ProblemInContest } from "@/entities/ProblemInContest";
import { Submission } from "@/entities/Submission";
import { SubmissionResult } from "@/entities/SubmissionResult";
import { Testcase } from "@/entities/Testcase";
import { User } from "../entities/User";
import { Repository } from "typeorm";

export type GetAllContestsResponseEntry = {
  id: number;
  title: string;
  startTime: number;
  endTime: number;
};

export type GetProblemsResponseEntry = {
  id: number;
  title: string;
  score: number;
};

export type ContestResponse = {
  message?: string;
  error?: string;
  payload?:
    | Contest
    | Contest[]
    | GetAllContestsResponseEntry[]
    | ContestParticipation
    | ContestParticipation[]
    | GetProblemsResponseEntry[]
    | null;
};

export type GetAllProblemResponseEntity = {
  id: number;
  title: string;
  statement: string;
  difficulty: number;
  timeLimit: number;
  memoryLimit: number;
  createdAt: string;
  owner: User;
};

export type ProblemResponse = {
  message: string;
  status: number;
  data?: GetAllProblemResponseEntity[] | null;
};

export type ProblemRequestBody = {
  title: string;
  statement: string;
  difficulty: number;
  timeLimit: number;
  memoryLimit: number;
  inputFormat: string;
  outputFormat: string;
  solutionText?: string;
  isPublished?: boolean;
};

export type LANGUAGE = 'CPP' | 'C' | 'JAVA' | 'PYTHON';

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Organizer = 'ORGANIZER',
  ProblemSetter = 'PROBLEM_SETTER',
}

export type TokenInfo = {
  id: number;
  role: string;
}

export type IContestParticipationRepository =
  Repository<ContestParticipation> & {
    // some specific methods for this repository
  };


export type IContestRepository = Repository<Contest> & {
  // some specific methods for this repository
};

export type IProblemInContestRepository =
  Repository<ProblemInContest> & {
    // some specific methods for this repository
  };

  export type IProblemRepository = Repository<Problem> & {
    getProblem(id: number, options?: {
        relations?: string[];
    }): Promise<Problem | null>;
}


export type ISubmissionRepository = Repository<Submission> & {
  // some specific methods for this repository
};

export type ISubmissionResultRepository = Repository<SubmissionResult> & {
  // some specific methods for this repository
};

export type ITestcaseRepository = Repository<Testcase> & {

}

export type IUserRepository = Repository<User> & {
  // some specific methods for this repository
};


export type CreateContestInput = {
  title: string;
  description?: string;
  ruleText?: string;
  startTime: number;
  endTime: number;
  scoringRule: string;
  isPlagiarismCheckEnabled?: boolean;
  isPublished?: boolean;
  organizerId: number;
};


export type CreateProblemInput = {
  title: string;
  statement: string;
  difficulty: number;
  timeLimit: number;
  memoryLimit: number;
  inputFormat: string;
  outputFormat: string;
  solutionText?: string;
  isPublished?: boolean;
  creatorId: number;
};


export type CreateUserInput = {
  handle: string;
  email: string;
  password: string;
}; 