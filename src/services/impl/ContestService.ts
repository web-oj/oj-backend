import { Contest } from "../../entities/Contest";
import { User } from "../../entities/User";
import { CreateContestInput, IContestService } from "../IContestService";
import {
  IContestRepository,
  ContestRepository,
} from "../../repositories/ContestRepo";
import {
  ContestParticipationRepository,
  IContestParticipationRepository,
} from "../../repositories/ContestParticipationRepo";
import { IUserRepository, UserRepository } from "../../repositories/UserRepo";
import { Between } from "typeorm";
import { ContestParticipation } from "../../entities/ContestParticipation";

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
    try {
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

      await this.contestRepo.save(contest);
      return contest;
    } catch (err) {
      throw new Error(`${err}`);
    }
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

  async getAllContests(
    limit?: number,
    offset?: number,
  ): Promise<Contest[] | null> {
    return this.contestRepo.find({
      skip: offset,
      take: limit,
    });
  }

  async getContestById(id: number): Promise<Contest | null> {
    return this.contestRepo.findOneBy({ id });
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
    limit?: number,
    offset?: number,
  ): Promise<ContestParticipation[] | null> {
    return this.contestParticipationRepo.find({
      where: {
        contestId: id,
      },
      order: {
        score: "DESC",
      },
      skip: offset,
      take: limit,
    });
  }

  async searchContests(
    searchKeyword?: string,
    startTimeLow?: number,
    startTimeHigh?: number,
    endTimeLow?: number,
    endTimeHigh?: number,
    limit?: number,
    offset?: number,
  ): Promise<Contest[] | null> {
    if (searchKeyword !== undefined) {
      return this.contestRepo
        .createQueryBuilder()
        .select()
        .where(
          `MATCH(title) AGAINST ('${searchKeyword}' IN NATURAL LANGUAGE MODE)`,
        )
        .andWhere(`startTime BETWEEN ${startTimeLow} AND ${startTimeHigh}`)
        .andWhere(`endTime BETWEEN ${endTimeLow} AND ${endTimeHigh}`)
        .orderBy("startTime", "DESC")
        .skip(offset)
        .take(limit)
        .getMany();
    } else {
      return this.contestRepo
        .createQueryBuilder()
        .select()
        .where(`startTime BETWEEN ${startTimeLow} AND ${startTimeHigh}`)
        .andWhere(`endTime BETWEEN ${endTimeLow} AND ${endTimeHigh}`)
        .orderBy("startTime", "DESC")
        .skip(offset)
        .take(limit)
        .getMany();
    }
  }

  async softDeleteContest(id: number): Promise<void> {
    await this.contestRepo.softDelete(id);
  }
}
