/**
 * @file contestController.ts
 * @summary Contest controller class.
 * @description This file contains function(s) which call our respective service(s) to get the payload.
 * @function
 *          - createContest()
 *          - updateContest()
 *          - softDeleteContest()
 *          - getContestById()
 *          - getContestByEmail()
 *          - getContestByHandle()
 *          - login()
 *          - logout()
 * @return Express JSON Response
 */

import "dotenv/config";
import { IContestService } from "../services/IContestService";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Route,
  Security,
} from "tsoa";
import { Contest } from "../entities/Contest";
import { IUserService } from "../services/IUserService";
import { ContestParticipation } from "../entities/ContestParticipation";
import { User } from "../entities/User";
import { UserService } from "../services/impl/UserService";
import { ContestService } from "../services/impl/ContestService";
import { IProblemService } from "../services/IProblemService";
import { ProblemService } from "../services/impl/ProblemService";

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

export type ContestResponse = {
  message?: string;
  error?: string;
  payload?:
    | Contest
    | Contest[]
    | GetAllContestsResponseEntry[]
    | ContestParticipation
    | ContestParticipation[]
    | GetProblemsResponseEntry[]
    | null;
};

@Route("contest")
export class ContestController extends Controller {
  private readonly contestService: IContestService;
  private readonly userService: IUserService;
  private readonly problemService: IProblemService;

  constructor() {
    super();
    this.userService = new UserService();
    this.contestService = new ContestService();
    this.problemService = new ProblemService();
  }

  @Get("")
  public async getAllContests(
    @Query() limit?: number,
    @Query() offset?: number,
  ): Promise<ContestResponse> {
    try {
      const allContests = await this.contestService.getAllContests(
        limit,
        offset,
      );
      let response: GetAllContestsResponseEntry[] = [];
      if (allContests !== null) {
        for (let contest of allContests) {
          response.push({
            id: contest.id,
            title: contest.title,
            startTime: contest.startTime,
            endTime: contest.endTime,
          });
        }
      }
      this.setStatus(200);
      return {
        message: "OK",
        payload: response,
      };
    } catch (err) {
      throw new Error(`Error getting contest: ${err}`);
    }
  }

  @Get("{id}")
  public async getContestById(@Path() id: number): Promise<ContestResponse> {
    try {
      let res = await this.contestService.getContest(id);
      if (!res) {
        this.setStatus(404);
        return {
          error: "Contest not found",
        };
      }
      this.setStatus(200);
      return {
        message: "OK",
        payload: res,
      };
    } catch (err) {
      throw new Error(`Error getting contest: ${err}`);
    }
  }

  @Get("/search")
  public async searchContests(
    @Query() searchKeywords?: string,
    @Query() startTimeLow?: number,
    @Query() startTimeHigh?: number,
    @Query() endTimeLow?: number,
    @Query() endTimeHigh?: number,
    @Query() limit?: number,
    @Query() offset?: number,
  ): Promise<ContestResponse> {
    try {
      if (startTimeLow === undefined) {
        startTimeLow = 0;
      }
      if (startTimeHigh === undefined) {
        startTimeHigh = 2 ** 63 - 1;
      }
      if (endTimeLow === undefined) {
        endTimeLow = 0;
      }
      if (endTimeHigh === undefined) {
        endTimeHigh = 2 ** 63 - 1;
      }

      const contests = await this.contestService.searchContests(
        searchKeywords,
        startTimeLow,
        startTimeHigh,
        endTimeLow,
        endTimeHigh,
        limit,
        offset,
      );
      let response: GetAllContestsResponseEntry[] = [];
      if (contests !== null) {
        for (let contest of contests) {
          response.push({
            id: contest.id,
            title: contest.title,
            startTime: contest.startTime,
            endTime: contest.endTime,
          });
        }
      }
      this.setStatus(200);
      return {
        message: "OK",
        payload: response,
      };
    } catch (err) {
      throw new Error(`Error searching contest: ${err}`);
    }
  }

  @Get("{id}/ranking")
  public async getContestRanking(
    @Path() id: number,
    @Query() limit?: number,
    @Query() offset?: number,
  ): Promise<ContestResponse> {
    try {
      let res = await this.contestService.getContestRanking(id, limit, offset);
      this.setStatus(200);
      return {
        message: "OK",
        payload: res,
      };
    } catch (err) {
      throw new Error(`Error getting contest ranking: ${err}`);
    }
  }

  @Get("{id}/problem")
  public async getContestProblems(
    @Path() id: number,
  ): Promise<ContestResponse> {
    try {
      let problemList = await this.contestService.getProblemList(id);
      let res: GetProblemsResponseEntry[] = [];
      for (let problemInContest of problemList) {
        let problemDetails = await this.problemService.getProblemById(
          problemInContest.problemId,
        );
        if (!problemDetails) {
          throw new Error("Error getting contest problem list");
        }
        res.push({
          id: problemInContest.problemId,
          title: problemDetails.title,
          score: problemInContest.score,
        });
      };
      this.setStatus(200);
      return {
        message: "OK",

        payload: res,
      };
    } catch (err) {
      throw new Error(`Error getting contest ranking: ${err}`);
    }
  }

  @Delete("{id}")
  @Security("jwt", ["user"])
  public async deleteContest(@Path() id: number): Promise<ContestResponse> {
    try {
      let res = await this.contestService.softDeleteContest(id);
      this.setStatus(200);
      return {
        message: "OK",

      };
    } catch (err) {
      throw new Error(`Error deleting contest: ${err}`);
    }
  }

  @Delete("{id}/problem")
  @Security("jwt", ["user"])
  public async deleteProblem(
    @Path() id: number,
    @Body() body: { problemId: number },
  ): Promise<ContestResponse> {
    try {
      let res = await this.contestService.softDeleteProblem(id, body.problemId);
      this.setStatus(200);
      return {
        message: "OK",

      };
    } catch (err) {
      throw new Error(`Error deleting problem: ${err}`);
    }
  }

  @Patch("{id}")
  @Security("jwt", ["user"])
  public async editContest(
    @Path() id: number,
    @Body()
    body: {
      title?: string;
      description?: string;
      ruleText?: string;
      startTime?: number;
      endTime?: number;
      scoringRule?: string;
      isPlagiarismCheckEnabled?: boolean;
      isPublished?: boolean;
      organizerId?: number;
    },
  ): Promise<ContestResponse> {
    try {
      let organizer: User | undefined = undefined;
      if (body.organizerId !== undefined) {
        let res = await this.userService.getUserById(body.organizerId);
        this.setStatus(404);
        if (!res) {
          return {
            message: "The new creator of the contest cannot be found",

          };
        }
        organizer = res;
      }

      let res = await this.contestService.editContest(id, {
        title: body.title,
        description: body.description,
        ruleText: body.ruleText,
        startTime: body.startTime,
        endTime: body.endTime,
        scoringRule: body.scoringRule,
        isPlagiarismCheckEnabled: body.isPlagiarismCheckEnabled,
        isPublished: body.isPublished,
      });
      this.setStatus(200);
      return {
        message: "OK",

        payload: res,
      };
    } catch (err) {
      throw new Error(`Error editing contest: ${err}`);
    }
  }

  @Patch("{id}/editScore")
  @Security("jwt", ["user"])
  public async editScore(
    @Path() id: number,
    @Body()
    body: {
      userId: number;
      score: number;
    },
  ): Promise<ContestResponse> {
    try {
      let res: any;
      res = await this.contestService.getContest(id);
      this.setStatus(404);
      if (!res) {
        return {
          message: "Contest not found",

        };
      }

      res = await this.userService.getUserById(body.userId);
      if (!res) {
        this.setStatus(404);
        return {
          message: "User not found",

          

        };
      }

      res =
        await this.contestService.getContestParticipationByContestIdAndUserId(
          id,
          body.userId,
        );
      if (!res) {
        this.setStatus(403);
        return {
          message: "User have not registered",

          payload: res,
        };
      }

      res = await this.contestService.editUserScoreInContest(
        id,
        body.userId,
        body.score,
      );

      this.setStatus(200);
      return {
        message: "OK",

        payload: res,
      };
    } catch (err) {
      throw new Error(`Error editing user score: ${err}`);
    }
  }

  @Patch("{id}/problem")
  @Security("jwt", ["user"])
  public async editProblem(
    @Path() id: number,
    @Body()
    body: {
      problemId: number;
      score?: number;
    },
  ): Promise<ContestResponse> {
    try {
      let res: any;
      res = await this.contestService.getContest(id);
      this.setStatus(404);
      if (!res) {
        return {
          message: "Contest not found",

        };
      }

      res = await this.problemService.getProblemById(body.problemId);
      if (!res) {
        this.setStatus(404);
        return {
          message: "Problem not found",


        };
      }

      res = await this.contestService.getProblemIncontest(id, body.problemId);
      if (!res) {
        this.setStatus(403);
        return {
          message: "User have not registered",
          payload: res,
        };
      }

      res = await this.contestService.editProblemScore(
        id,
        body.problemId,
        body.score,
      );

      this.setStatus(200);
      return {
        message: "OK",
        payload: res,
      };
    } catch (err) {
      throw new Error(`Error editing problem: ${err}`);
    }
  }

  @Post("")
  @Security("jwt", ["user"])
  public async createContest(
    @Body()
    body: {
      title: string;
      description?: string;
      ruleText?: string;
      startTime: number;
      endTime: number;
      scoringRule: string;
      isPlagiarismCheckEnabled?: boolean;
      isPublished?: boolean;
      organizerId: number;
    },
  ): Promise<ContestResponse> {
    const {
      title,
      description,
      ruleText,
      startTime,
      endTime,
      scoringRule,
      isPlagiarismCheckEnabled,
      isPublished,
      organizerId,
    } = body;

    try {
      let res: any;

      res = await this.userService.getUserById(organizerId);
      if (!res) {
        this.setStatus(400);
        return {
          message: "The creator of the contest cannot be found",
        };
      }

      res = await this.contestService.createContest({
        title,
        description,
        ruleText,
        startTime,
        endTime,
        scoringRule,
        isPlagiarismCheckEnabled,
        isPublished,
        organizerId,
      });
      this.setStatus(200);
      return {
        message: "Contest created successfully",
        payload: res,
      };
    } catch (err) {
      throw new Error(`Error creating contest: ${err}`);
    }
  }

  @Post("{id}/register")
  @Security("jwt", ["user"])
  public async registerToContest(
    @Path() id: number,
    @Body() body: { userId: number },
  ): Promise<ContestResponse> {
    const { userId } = body;

    try {
      let res: any;

      res = await this.contestService.getContest(id);
      if (!res) {
        this.setStatus(404);
        return {
          message: "Contest not found",
        };
      }

      res = await this.userService.getUserById(userId);
      if (!res) {
        this.setStatus(404);
        return {
          message: "User not found",

        };
      }

      res =
        await this.contestService.getContestParticipationByContestIdAndUserId(
          id,
          userId,
        );
      if (res) {
        this.setStatus(403);
        return {
          message: "User already registered",

          payload: res,
        };
      }

      res = await this.contestService.addContestParticipation(id, userId);
      this.setStatus(201);
      return {
        message: "Registered successfully",

        payload: res,
      };
    } catch (err) {
      throw new Error(`Error registering user to contest ${err}`);
    }
  }

  @Post("{id}/problem")
  @Security("jwt", ["user"])
  public async addProblem(
    @Path() id: number,
    @Body() body: { problemId: number; score?: number },
  ): Promise<ContestResponse> {
    const { problemId, score } = body;

    try {
      let res: any;

      res = await this.contestService.getContest(id);
      if (!res) {
        this.setStatus(400);
        return {
          error: "Contest not found",
        };
      }

      res = await this.problemService.getProblemById(problemId);
      if (!res) {
        this.setStatus(400);
        return {
          error: "Problem not found",
        };
      }

      res = await this.contestService.getProblemIncontest(problemId, id);
      if (res) {
        this.setStatus(400);
        return {
          error: "Problem already added to contest",
        };
      }

      res = await this.contestService.addProblem(id, problemId, score);
      this.setStatus(200);
      return {
        message: "Problem added to contest successfully",
      };
    } catch (err) {
      throw new Error(`Error adding problem to contest ${err}`);
    }
  }

  // @Get("{handle}")
  // public async getContestByHandle(
  //   @Path() handle: string,
  // ): Promise<Contest | null> {
  //   try {
  //     const contest = await this.contestService.getContestByHandle(handle);
  //     return contest;
  //   } catch (err) {
  //     throw new Error(`Error getting contest: ${err}`);
  //   }
  // }
}
