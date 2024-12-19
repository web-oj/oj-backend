import { Contest } from "../../entities/Contest";
import { IContestService } from "../IContestService";
import {
  ContestRepository,
} from "../../repositories/ContestRepo";
import {
  ContestParticipationRepository,
} from "../../repositories/ContestParticipationRepo";
import { UserRepository } from "../../repositories/UserRepo";
import { ContestParticipation } from "../../entities/ContestParticipation";
import {
  ProblemInContestRepository,
} from "../../repositories/ProblemInContestRepo";
import { ProblemInContest } from "../../entities/ProblemInContest";
import { CreateContestInput, IContestParticipationRepository, IContestRepository, IProblemInContestRepository, IProblemRepository, IUserRepository } from "@/types/types";
import { Problem } from "@/entities/Problem";
import { ProblemRepository } from "@/repositories/ProblemRepo";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { stdout } from "process";

export class ContestService implements IContestService {
  private readonly userRepo: IUserRepository;
  private readonly contestRepo: IContestRepository;
  private readonly contestParticipationRepo: IContestParticipationRepository;
  private readonly problemInContestRepo: IProblemInContestRepository;
  private readonly problemRepo: IProblemRepository;

  constructor() {
    this.userRepo = UserRepository;
    this.contestRepo = ContestRepository;
    this.contestParticipationRepo = ContestParticipationRepository;
    this.problemInContestRepo = ProblemInContestRepository;
    this.problemRepo = ProblemRepository;
  }

  async addContestParticipation(
    contestId: number,
    userId: number,
  ): Promise<ContestParticipation> {
    const contest = await this.contestRepo.getContest({
      query: { id: contestId },
      relations: ["participations"],
    });
    if (!contest) {
      throw new Error(`Contest with ID ${contestId} not found`);
    }
    const user = await this.userRepo.getUser({
      query: { id: userId },
    });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    if (contest.participations.find((p) => p.user.id === userId)) {
      throw new Error(`User with ID ${userId} already participated in contest with ID ${contestId}`);
    }
    return this.contestParticipationRepo.save({
      contest,
      user,
    });
  }

  async addProblem(
    contestId: number,
    problemId: number,
    score?: number,
  ): Promise<ProblemInContest> {
    const contest = await this.contestRepo.getContest({
      query: { id: contestId },
      relations: ["problemsInContest"],
    });
    if (!contest) {
      throw new Error(`Contest with ID ${contestId} not found`);
    }
    const problem = await this.problemRepo.getProblem({
      query: { id: problemId },
    })
    if (!problem) {
      throw new Error(`Problem with ID ${problemId} not found`);
    }
    try {
      const problemInContest = new ProblemInContest();
      problemInContest.problem = problem;
      problemInContest.contest = contest;
      problemInContest.score = score ? score : 0;
      return await this.problemInContestRepo.save(problemInContest);
    } catch (err) {
      throw new Error(`Error adding problem to contest: ${err}`);
    }
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
    return this.getContest(id);
  }

  async editProblemScore(
    contestId: number,
    problemId: number,
    score: number,
  ): Promise<ProblemInContest | null> {
    const problem = await this.problemRepo.getProblem({
      query: { id: problemId },
    });
    if (!problem) {
      throw new Error(`Problem with ID ${problemId} not found`);
    }
    const contest = await this.contestRepo.getContest({
      query: { id: contestId },
    });
    if (!contest) {
      throw new Error(`Contest with ID ${contestId} not found`);
    }
    if (contest.problemsInContest.findIndex((p) => p.problem.id === problemId) === -1) {
      throw new Error(`Contest with ID ${contestId} does not have problem with ID ${problemId}`);
    }
    const problemInContest = await this.problemInContestRepo.getProblemInContest({
      query: {
        contestId: contest.id,
        problemId: problem.id,
      },
    });
    if (problemInContest.length !== 1) {
      throw new Error(`Problem with ID ${problemId} not associated with contest with ID ${contestId}`);
    }
    const updatedData: Partial<ProblemInContest> = {
      score,
    };
    try {
      await this.problemInContestRepo.update(problemInContest[0].id, updatedData);
    } catch (err) {
      throw new Error(`Error updating problem score: ${err}`);
    }
    problemInContest[0].score = score;
    return problemInContest[0];
  }

  async editUserScoreInContest(
    contestId: number,
    userId: number,
    newScore: number,
  ): Promise<ContestParticipation | null> {
    const contest = await this.contestRepo.getContest({
      query: { id: contestId },
    });
    const user = await this.userRepo.getUser({
      query: { id: userId },
    });
    if (!contest) {
      throw new Error(`Contest with ID ${contestId} not found`);
    }
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    const contestParticipation = await this.contestParticipationRepo.getContestParticipation({
      query: {
        contest,
        user,
      },
    });
    if (!contestParticipation) {
      throw new Error(`User with ID ${userId} not participating in contest with ID ${contestId}`);
    }
    const updatedData: Partial<ContestParticipation> = {
      score: newScore,
    };
    try {
      await this.contestParticipationRepo.update(
        contestParticipation.id,
        updatedData,
      );
    } catch (err) {
      throw new Error(`Error updating user score: ${err}`);
    }
    contestParticipation.score = newScore;
    return contestParticipation;
  }

  async getAllContests(
    limit?: number,
    offset?: number,
  ): Promise<Contest[]> {
    return this.contestRepo.find({
      skip: offset,
      take: limit,
    });
  }

  async getContest(id: number): Promise<Contest | null> {
    return this.contestRepo.getContest({
      query: {
        id,
      },
      relations: ["problemsInContest", "participations", "submissions", "organizer"],
    })
  }

  async getContestByTitle(title: string): Promise<Contest | null> {
    return this.contestRepo.getContest({
      query: {
        title,
      },
      relations: ["problemsInContest", "participations", "submissions", "organizer"],
    })
  }

  async getContestParticipationByContestIdAndUserId(
    contestId: number,
    userId: number,
  ): Promise<ContestParticipation | null> {
    const contest = await this.contestRepo.getContest({
      query: { id: contestId },
    });
    const user = await this.userRepo.getUser({
      query: { id: userId },
    });
    if (!contest) {
      throw new Error(`Contest with ID ${contestId} not found`);
    }
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return this.contestParticipationRepo.getContestParticipation({
      query: {
        contest,
        user,
      },
    });
  }

  async getContestRanking(
    id: number,
    limit?: number,
    offset?: number,
  ): Promise<ContestParticipation[]> {
    const contest = await this.contestRepo.getContest({
      query: { id },
    });
    if (!contest) {
      throw new Error(`Contest with ID ${id} not found`);
    } 
    const ranking = this.contestParticipationRepo.getContestParticipations({
      query: {
        contest,
      },
      pagination: {
        limit,
        offset,
        sort: {
          field: "score",
          order: "DESC",
        },
      },
    })
    if (!ranking) {
      return [];
    }
    return ranking;
  }

  async getProblemsInContest(
    contestId: number,
  ): Promise<ProblemInContest[]> {
    const contest = await this.contestRepo.getContest({
      query: { id: contestId },
    });
    if (!contest) {
      throw new Error(`Contest with ID ${contestId} not found`);
    }
    console.log(contest);
    const problemsInContest = await this.problemInContestRepo.getProblemInContest({
      query: {
        contestId: contest.id,
      }
    });
    if (!problemsInContest) {
      return [];
    }
    console.log(problemsInContest);
    return problemsInContest;
  }

  async getProblemList(contestId: number): Promise<Problem[]> {
    const problemsInContest = await this.getProblemsInContest(contestId);
    const problems: Problem[] = [];
    for (const pic of problemsInContest) {
      problems.push(pic.problem);
    }
    return problems;
  }

  async searchContests(
    searchKeyword?: string,
    startTimeLow?: number,
    startTimeHigh?: number,
    endTimeLow?: number,
    endTimeHigh?: number,
    limit?: number,
    offset?: number,
  ): Promise<Contest[]> {
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

  async softDeleteProblem(contestId: number, problemId: number): Promise<void> {
    const contest = await this.contestRepo.getContest({
      query: { id: contestId },
    });
    const problem = await this.problemRepo.getProblem({
      query: { id: problemId },
    });
    if (!contest) {
      throw new Error(`Contest with ID ${contestId} not found`);
    }
    if (!problem) {
      throw new Error(`Problem with ID ${problemId} not found`);
    }
    await this.problemInContestRepo.softDelete({ contest, problem });
  }

  async runMoss(contestId: number): Promise<void> {
    const contest = await this.contestRepo.getContest({
      query: { id: contestId },
      relations: ["submissions", "submissions.owner"],
    });
    if (!contest) {
      throw new Error(`Contest with ID ${contestId} not found`);
    }
    const currentDir = process.cwd();
    const dir = path.join(currentDir, 'moss', contestId.toString());
    
    // Create directory if it doesn't exist
    try {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
      }
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Directory created: ${dir}`);
    } catch (error) {
      console.error(`Error creating directory: ${error}`);
    }
    // Write submissions to files
    for (const submission of contest.submissions) {
      const code = Buffer.from(submission.code, 'base64').toString();
      const owner = submission.owner;
      const filePath = path.join(dir, `${owner.handle}.cpp`);
      try {
        fs.writeFileSync(filePath, code);
      } catch (error) {
        console.error(`Error writing file: ${error}`);
      }
    } 
    // Ensure the moss script has execution permissions
    const mossScriptPath = path.join(currentDir, 'moss/moss');
    exec(`chmod +x ${mossScriptPath}`, (chmodError) => {
      if (chmodError) {
        console.error(`Error setting execution permissions for moss script: ${chmodError.message}`);
        return;
      }

      // Run MOSS
      const command = `${mossScriptPath} -l cc ${dir}/*.cpp`;
      exec(command, async (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running MOSS: ${error.message}`);
          return;
        }
        console.log(`MOSS output: ${stdout}`);
        if (stderr) {
          console.error(`MOSS stderr: ${stderr}`);
        }

        const output = stdout.toString();
        console.log(`MOSS output: ${output}`);
        if (stderr) {
          console.error(`MOSS stderr: ${stderr}`);
        }
    
        // Extract the result link
        const resultLinkMatch = output.match(/http:\/\/moss\.stanford\.edu\/results\/\d+\/\d+/);
        if (resultLinkMatch) {
          const resultLink = resultLinkMatch[0];
          console.log(`MOSS result link: ${resultLink}`);
          contest.mossUrl = resultLink;
          await this.editContest(contestId, { mossUrl: resultLink });
        } else {
          console.error('MOSS result link not found in the output.');
        }    
      });
    });  
  }

  async rateContest(contestId: number): Promise<void> {
    const contest = await this.contestRepo.getContest({
      query: { id: contestId },
      relations: ["participations", "participations.user"],
    });
    if (!contest) {
      throw new Error(`Contest with ID ${contestId} not found`);
    }
    const ranking = await this.getContestRanking(contestId);
    for (let i = 0; i < ranking.length; i++) {
      const participation = ranking[i];
      participation.user.rating += 100 * (ranking.length - i);
      await this.userRepo.update(participation.user.id, { rating: participation.user.rating });
    }
  }
}
