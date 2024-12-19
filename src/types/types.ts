import "reflect-metadata";
import { Contest } from "../entities/Contest";
import { ContestParticipation } from "../entities/ContestParticipation";
import { Problem } from "../entities/Problem";
import { ProblemInContest } from "@/entities/ProblemInContest";
import { Submission } from "@/entities/Submission";
import { SubmissionResult } from "@/entities/SubmissionResult";
import { Testcase } from "@/entities/Testcase";
import { User } from "../entities/User";
import { Repository } from "typeorm";

export type ApiResponse<T> = {
  message: string;
  status: number;
  data?: T;
  error?: string;
}

export type CreateNewUserRequest = {
  handle: string;
  email: string;
  password: string;
}

export type GetUserIdFromTokenResponse = {
  id: number;
}

export type GetUserRoleFromTokenResponse = {
  role: string;
} 

export type UpdateUserRequest = {
  handle?: string;
  email?: string;
  password?: string;
  bio?: string;
  avatar_image?: string;
  country?: string;
}

export type LoginRequest = {
  email?: string;
  handle?: string;
  password: string;
}

export type LoginResponse = {
  token: string;
}

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

export type GetUserResponse = Omit<User, 'password'> | null;

export type GetAllContestsResponse = Contest[];

export type GetContestResponse = Contest;

export type GetProblemResponse = Problem;

export type GetAllProblemsResponse = Problem[];

export type GetContestRankingResponse = ContestParticipation[];

export type GetContestProblemResponse = Problem[];

export type NewProblemRequest = {
  title: string;
  statement: string;
  difficulty?: number;
  timeLimit: number;
  memoryLimit: number;
  inputFormat: string;
  outputFormat: string;
  solutionText?: string;
  isPublished?: boolean;
};

export type UpdateProblemRequest = {
  title?: string;
  statement?: string;
  difficulty?: number;
  timeLimit?: number;
  memoryLimit?: number;
  inputFormat?: string;
  outputFormat?: string;
  solutionText?: string;
  isPublished?: boolean;
}

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

export type ContestParticipationQueryOptions = {
  query: {
    contest?: Contest;
    user?: User;
  },
  pagination?: {
    limit?: number;
    offset?: number;
    sort?: {
      field: keyof ContestParticipation;
      order: 'ASC' | 'DESC';
    }
  }
}

export type IContestParticipationRepository =
  Repository<ContestParticipation> & {
    getContestParticipation(options: ContestParticipationQueryOptions): Promise<ContestParticipation | null>;

    getContestParticipations(options: ContestParticipationQueryOptions): Promise<ContestParticipation[]>;
  };

export type ContestQueryOptions = {
  query: {
    id?: number;
    title?: string;
  },
  relations?: Array<string>;
}

export type IContestRepository = Repository<Contest> & {
  getContest(options: ContestQueryOptions): Promise<Contest | null>;
};

export type ProblemInContestQueryOptions = {
  query: {
    contestId?: number;
    problemId?: number;
  }
}

export type IProblemInContestRepository = Repository<ProblemInContest> & {
  getProblemInContest(options: ProblemInContestQueryOptions): Promise<ProblemInContest[]>;
};

export type ProblemQueryOptions = {
  query: {
    id?: number;
    title?: string;
  },
  relations?: {
    owner?: boolean;
    submissions?: boolean;
    testcases?: boolean;
    associatedContests?: boolean;
  };
}

export type IProblemRepository = Repository<Problem> & {
  getProblem(options: ProblemQueryOptions): Promise<Problem | null>;
}


export type ISubmissionRepository = Repository<Submission> & {
  // some specific methods for this repository
};

export type ISubmissionResultRepository = Repository<SubmissionResult> & {
  // some specific methods for this repository
};

export type ITestcaseRepository = Repository<Testcase> & {

}

export type UserQueryOptions = {
  query: {
    id?: number;
    handle?: string;
    email?: string;
  };
  relations?: Array<string>,
};

export type IUserRepository = Repository<User> & {
  getUser(options: UserQueryOptions): Promise<User | null>;
};


export type CreateContestInput = {
  title: string;
  description?: string;
  ruleText?: string;
  startTime: number;
  endTime: number;
  scoringRule: string;
  isPublished?: boolean;
  organizerId: number;
};

export type CreateProblemInput = NewProblemRequest & {
  creatorId: number;
}

export type CreateUserInput = {
  handle: string;
  email: string;
  password: string;
}; 

export type DeleteProblemInContestRequest = {
  problemId: number;
}

export type UpdateContestRequest = {
  title?: string;
  description?: string;
  ruleText?: string;
  startTime?: number;
  endTime?: number;
  scoringRule?: string;
  isPublished?: boolean;
}