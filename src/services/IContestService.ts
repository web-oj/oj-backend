import { User } from "@/entities/User";
import { Contest, ScoringRules } from "../entities/Contest";
import { ContestParticipation } from "@/entities/ContestParticipation";

export type CreateContestInput = {
  title: string;
  description?: string;
  ruleText?: string;
  startTime: number;
  endTime: number;
  scoringRule: ScoringRules;
  isPlagiarismCheckEnabled?: boolean;
  isPublished?: boolean;
  organizer: User;
};

export interface IContestService {
  createContest(ContestInput: CreateContestInput): Contest;

  editContest(
    id: number,
    updatedData: Partial<Contest>,
  ): Promise<Contest | null>;

  findContestsWhoseTitleContain(phrase: string): Promise<Contest[] | null>;

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

  getContestRanking(
    id: number,
    getQty?: number,
    getStartFrom?: number,
  ): Promise<ContestParticipation[] | null>;

  softDeleteContest(id: number): Promise<void>;
}
