import { User } from "@/entities/User";
import { Contest } from "../entities/Contest";
import { ContestParticipation } from "@/entities/ContestParticipation";

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

export interface IContestService {
  addContestParticipation(
    contestId: number,
    userId: number,
  ): Promise<ContestParticipation>;

  createContest(ContestInput: CreateContestInput): Promise<Contest>;

  editContest(
    id: number,
    updatedData: Partial<Contest>,
  ): Promise<Contest | null>;

  editUserScoreInContest(
    contestId: number,
    userId: number,
    newScore: number,
  ): Promise<ContestParticipation | null>;

  searchContests(
    searchKeyword: string,
    getQty?: number,
    getStartFrom?: number,
  ): Promise<Contest[] | null>;

  getAllContests(
    getQty?: number,
    getStartFrom?: number,
  ): Promise<Contest[] | null>;

  getContestById(id: number): Promise<Contest | null>;

  getContestsByTimeRange(
    startTimeLow: number,
    startTimeHigh: number,
    endTimeLow: number,
    endTimeHigh: number,
    getQty?: number,
    getStartFrom?: number,
  ): Promise<Contest[] | null>;

  getContestByTitle(title: string): Promise<Contest | null>;

  getContestParticipationByContestIdAndUserId(
    contestId: number,
    userId: number,
  ): Promise<ContestParticipation | null>;

  getContestRanking(
    contestId: number,
    getQty?: number,
    getStartFrom?: number,
  ): Promise<ContestParticipation[] | null>;

  softDeleteContest(id: number): Promise<void>;
}
