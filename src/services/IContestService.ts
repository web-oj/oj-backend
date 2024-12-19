import { Contest } from "../entities/Contest";
import { ContestParticipation } from "@/entities/ContestParticipation";
import { ProblemInContest } from "@/entities/ProblemInContest";
import { CreateContestInput } from "../types/types";
import { Problem } from "@/entities/Problem";

export interface IContestService {
  addContestParticipation(
    contestId: number,
    userId: number,
  ): Promise<ContestParticipation>;

  removeContestParticipation(
    contestId: number,
    userId: number,
  ): Promise<void>;

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
  ): Promise<Contest[]>;

  getAllContests(limit?: number, offset?: number): Promise<Contest[]>;

  getContest(id: number): Promise<Contest | null>;

  getContestParticipationByContestIdAndUserId(
    contestId: number,
    userId: number,
  ): Promise<ContestParticipation | null>;

  getContestRanking(
    contestId: number,
    limit?: number,
    offset?: number,
  ): Promise<ContestParticipation[]>;

  getProblemsInContest(
    contestId: number,
  ): Promise<ProblemInContest[]>;

  getProblemList(contestId: number): Promise<Problem[]>;

  softDeleteContest(id: number): Promise<void>;

  softDeleteProblem(contestId: number, problemId: number): Promise<void>;

  runMoss(contestId: number): Promise<void>;

  rateContest(contestId: number): Promise<void>;
}
