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

  updateContest(
    id: number,
    updatedData: Partial<Contest>,
  ): Promise<Contest | null>;

  softDeleteContest(id: number): Promise<boolean>;

  addParticipant(participant: User): Promise<boolean>;

  removeParticipant(participant: User): Promise<boolean>;
}
