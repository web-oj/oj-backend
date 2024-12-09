import { Contest } from "../entities/Contest";
import { ContestParticipation } from "@/entities/ContestParticipation";
import { ProblemInContest } from "@/entities/ProblemInContest";
import { CreateContestInput } from "../types/types";

export interface IContestService {
  addContestParticipation(
    contestId: number,
    userId: number,
  ): Promise<ContestParticipation>;

  addProblem(
    contestId: number,
    problemId: number,
    score?: number,
  ): Promise<ProblemInContest>;

  createContest(ContestInput: CreateContestInput): Promise<Contest>;

  editContest(
    id: number,
    updatedData: Partial<Contest>,
  ): Promise<Contest | null>;

  editProblemScore(
    contestId: number,
    problemId: number,
    score?: number,
  ): Promise<ProblemInContest | null>;

  editUserScoreInContest(
    contestId: number,
    userId: number,
    newScore: number,
  ): Promise<ContestParticipation | null>;

  searchContests(
    searchKeyword?: string,
    startTimeLow?: number,
    startTimeHigh?: number,
    endTimeLow?: number,
    endTimeHigh?: number,
    limit?: number,
    offset?: number,
  ): Promise<Contest[] | null>;

  getAllContests(limit?: number, offset?: number): Promise<Contest[] | null>;

  getContest(id: number, options?: {
    loadProblems?: boolean;
    loadParticipations?: boolean;
  }): Promise<Contest | null>;

  getContestParticipationByContestIdAndUserId(
    contestId: number,
    userId: number,
  ): Promise<ContestParticipation | null>;

  getContestRanking(
    contestId: number,
    limit?: number,
    offset?: number,
  ): Promise<ContestParticipation[] | null>;

  getProblemIncontest(
    contestId: number,
    problemId: number,
  ): Promise<ProblemInContest | null>;

  getProblemList(contestId: number): Promise<ProblemInContest[]>;

  softDeleteContest(id: number): Promise<void>;

  softDeleteProblem(contestId: number, problemId: number): Promise<void>;
}