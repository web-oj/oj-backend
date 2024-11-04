import { User } from "@/entities/User";
import { Contest, ScoringRules } from "../entities/Contest";

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

  getContestById(id: number): Promise<Contest>;

  getContestParticipants(id: number): Promise<User[]>

  getContestsByTimeRange(
    startTimeLow: number,
    startTimeHigh: number,
    endTimeLow: number,
    endTimeHigh: number,
  ): Promise<Contest[]>;

  getContestsByTitle(title: string): Promise<Contest[]>;

  softDeleteContest(id: number): Promise<boolean>;

  updateContest(
    id: number,
    updatedData: Partial<Contest>,
  ): Promise<Contest | null>;
}
