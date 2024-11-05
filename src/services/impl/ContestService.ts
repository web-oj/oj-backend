import { Contest } from "../../entities/Contest";
import { User } from "@/entities/User";
import { CreateContestInput, IContestService } from "../IContestService";
import {
  IContestRepository,
  ContestRepository,
} from "../../repositories/ContestRepo";
import {
  ContestParticipationRepository,
  IContestParticipationRepository,
} from "@/repositories/ContestParticipationRepo";
import { IUserRepository, UserRepository } from "@/repositories/UserRepo";
import { Between } from "typeorm";
import { ContestParticipation } from "@/entities/ContestParticipation";

export class ContestService implements IContestService {
  private readonly userRepo: IUserRepository;
  private readonly contestRepo: IContestRepository;
  private readonly contestParticipationRepo: IContestParticipationRepository;

  constructor() {
    this.userRepo = UserRepository;
    this.contestRepo = ContestRepository;
    this.contestParticipationRepo = ContestParticipationRepository;
  }

  async addContestParticipation(
    contestId: number,
    userId: number,
  ): Promise<ContestParticipation> {
    return this.contestParticipationRepo.save({
      contestId: contestId,
      userId: userId,
    });
  }

  async createContest(userInput: CreateContestInput): Promise<Contest> {
    const contest = new Contest();

    contest.title = userInput.title;
    if (typeof userInput.description !== "undefined") {
      contest.description = userInput.description;
    }
    if (typeof userInput.ruleText !== "undefined") {
      contest.ruleText = userInput.ruleText;
    }
    contest.startTime = userInput.startTime;
    contest.endTime = userInput.endTime;
    contest.scoringRule = userInput.scoringRule;
    if (typeof userInput.isPlagiarismCheckEnabled !== "undefined") {
      contest.isPlagiarismCheckEnabled = userInput.isPlagiarismCheckEnabled;
    }
    if (typeof userInput.isPublished !== "undefined") {
      contest.isPublished = userInput.isPublished;
    }
    contest.organizer = await UserRepository.findOneByOrFail({
      id: userInput.organizerId,
    });
    this.contestRepo.save(contest);
    return contest;
  }

  async editContest(
    id: number,
    updatedData: Partial<Contest>,
  ): Promise<Contest | null> {
    await this.contestRepo.update(id, updatedData);
    return this.contestRepo.findOneBy({ id });
  }

  async editUserScoreInContest(
    contestId: number,
    userId: number,
    newScore: number,
  ): Promise<ContestParticipation | null> {
    const updatedData: Partial<ContestParticipation> = {
      contestId: contestId,
      userId: userId,
      score: newScore,
    };
    await this.contestRepo.update([contestId, userId], updatedData);
    return this.contestParticipationRepo.findOneBy({ contestId, userId });
  }

  async findContestsWhoseTitleContain(
    phrase: string,
  ): Promise<Contest[] | null> {
    return this.contestRepo
      .createQueryBuilder()
      .select()
      .where(`MATCH(title) AGAINST ('${phrase}' IN BOOLEAN MODE)`)
      .getMany();
  }

  async getAllContests(
    getQty?: number,
    getStartFrom?: number,
  ): Promise<Contest[] | null> {
    return this.contestRepo.find({
      skip: getStartFrom,
      take: getQty,
    });
  }

  async getContestById(id: number): Promise<Contest | null> {
    return this.contestRepo.findOneBy({ id });
  }

  async getContestsByTimeRange(
    startTimeLow: number,
    startTimeHigh: number,
    endTimeLow: number,
    endTimeHigh: number,
    getQty?: number,
    getStartFrom?: number,
  ): Promise<Contest[] | null> {
    return this.contestRepo.find({
      where: {
        startTime: Between(startTimeLow, startTimeHigh),
        endTime: Between(endTimeLow, endTimeHigh),
      },
      skip: getStartFrom,
      take: getQty,
    });
  }

  async getContestByTitle(title: string): Promise<Contest | null> {
    return this.contestRepo.findOneBy({ title });
  }

  async getContestParticipationByContestIdAndUserId(
    contestId: number,
    userId: number,
  ): Promise<ContestParticipation | null> {
    return this.contestParticipationRepo.findOneBy({ contestId, userId });
  }

  async getContestRanking(
    id: number,
    getQty?: number,
    getStartFrom?: number,
  ): Promise<ContestParticipation[] | null> {
    return this.contestParticipationRepo.find({
      where: {
        contestId: id,
      },
      order: {
        score: "DESC",
      },
      skip: getStartFrom,
      take: getQty,
    });
  }

  async softDeleteContest(id: number): Promise<void> {
    await this.contestRepo.softDelete(id);
  }
}
