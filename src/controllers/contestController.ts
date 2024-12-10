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
  Header,
  Patch,
  Path,
  Post,
  Query,
  Route,
  Security,
  Tags,
} from "tsoa";
import { Contest } from "../entities/Contest";
import { IUserService } from "../services/IUserService";
import { ContestParticipation } from "../entities/ContestParticipation";
import { User } from "../entities/User";
import { UserService } from "../services/impl/UserService";
import { ContestService } from "../services/impl/ContestService";
import { IProblemService } from "../services/IProblemService";
import { ProblemService } from "../services/impl/ProblemService";
import { ApiResponse, DeleteProblemInContestRequest, GetAllContestsResponse, GetAllContestsResponseEntry, GetContestProblemResponse, GetContestRankingResponse, GetContestResponse, GetProblemsResponseEntry, Role, UpdateContestRequest } from "../types/types";
import { decodeJWT } from "@/middleware/authentication";

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
  @Tags("Contest")
  public async getAllContests(
    @Query() limit?: number,
    @Query() offset?: number,
  ): Promise<ApiResponse<GetAllContestsResponse>> {
    try {
      const allContests = await this.contestService.getAllContests(
        limit,
        offset,
      );
      this.setStatus(200);
      return {
        message: "Contests fetched successfully",
        status: 200,
        data: allContests,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        error: `Error fetching contests ${err}`,
        status: 400,
        message: "Contests not fetched.",
      };
    }
  }

  @Get("{id}")
  @Tags("Contest")
  public async getContestById(@Path() id: number): Promise<ApiResponse<GetContestResponse>> {
    try {
      const contest = await this.contestService.getContest(id);
      if (!contest) {
        this.setStatus(404);
        return {
          error: "Contest not found",
          status: 404,
          message: "Contest not found.",
        };
      } else {
        this.setStatus(200);
        return {
          message: "OK",
          status: 200,
          data: contest,
        };
      }
    } catch (err) {
      this.setStatus(400);
      return {
        error: `Error getting contest: ${err}`,
        status: 400,
        message: "Contest not found.",
      };
    }
  }

  @Get("/search")
  @Tags("Contest")
  public async searchContests(
    @Query() searchKeywords?: string,
    @Query() startTimeLow?: number,
    @Query() startTimeHigh?: number,
    @Query() endTimeLow?: number,
    @Query() endTimeHigh?: number,
    @Query() limit?: number,
    @Query() offset?: number,
  ): Promise<ApiResponse<GetAllContestsResponse>> {
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
      this.setStatus(200);
      return {
        message: "OK",
        status: 200,
        data: contests,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        error: `Error searching contests ${err}`,
        status: 400,
        message: "Contests not found.",
      }
    }
  }

  @Get("{id}/ranking")
  @Tags("Contest")
  public async getContestRanking(
    @Path() id: number,
    @Query() limit?: number,
    @Query() offset?: number,
  ): Promise<ApiResponse<GetContestRankingResponse>> {
    try {
      let ranking = await this.contestService.getContestRanking(id, limit, offset);
      this.setStatus(200);
      return {
        message: "OK",
        status: 200,
        data: ranking,
      };
    } catch (err) {
      throw new Error(`Error getting contest ranking: ${err}`);
    }
  }

  @Get("{id}/problem")
  @Tags("Contest")
  public async getContestProblems(
    @Path() id: number,
  ): Promise<ApiResponse<GetContestProblemResponse>> {
    try {
      const problem = await this.contestService.getProblemList(id);
      this.setStatus(200);
      return {
        message: "OK",
        status: 200,
        data: problem,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        error: `Error getting contest problems ${err}`,
        status: 400,
        message: "Problems not found.",
      }
    }
  }

  @Delete("{id}")
  @Tags("Contest")
  @Security("jwt", [Role.User])
  public async deleteContest(@Path() id: number): Promise<ApiResponse<null>> {
    try {
      await this.contestService.softDeleteContest(id);
      this.setStatus(200);
      return {
        message: "Deleted contest successfully",
        status: 200,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        error: `Error deleting contest ${err}`,
        status: 400,
        message: "Contest not deleted.",
      }
    }
  }

  @Delete("{id}/problem")
  @Tags("Contest")
  @Security("jwt", [Role.User])
  public async deleteProblem(
    @Path() id: number,
    @Body() body: DeleteProblemInContestRequest,
  ): Promise<ApiResponse<null>> {
    try {
      await this.contestService.softDeleteProblem(id, body.problemId);
      this.setStatus(200);
      return {
        message: "Deleted problem successfully",
        status: 200,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        error: `Error deleting problem ${err}`,
        status: 400,
        message: "Problem not deleted.",
      }
    }
  }

  @Patch("{id}")
  @Tags("Contest")
  @Security("jwt", [Role.User])
  public async editContest(
    @Path() id: number,
    @Body() body: UpdateContestRequest,
    @Header('x-access-token') token: string,
  ): Promise<ApiResponse<null>> {
    try {
      const decoded = await decodeJWT(token);
      const contest = await this.contestService.getContest(id);

      if (!contest) {
        this.setStatus(404);
        return {
          error: "Contest not found",
          status: 404,
          message: "Contest not found.",
        };
      }

      if (contest.organizer.id !== decoded.id) {
        this.setStatus(403);
        return {
          error: "Forbidden",
          status: 403,
          message: "You are not the organizer of this contest.",
        };
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
        message: "Contest edited successfully",
        status: 200,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        error: `Error editing contest ${err}`,
        status: 400,
        message: "Contest not edited.",
      };
    }
  }

  @Patch("{id}/editScore")
  @Tags("Contest")
  @Security("jwt", [Role.User])
  public async editScore(
    @Path() id: number,
    @Body()
    body: {
      userId: number;
      score: number;
    },
  ): Promise<ApiResponse<null>> {
    try {
      const contest = await this.contestService.getContest(id);
      if (!contest) {
        this.setStatus(404);
        return {
          message: "Contest not found",
          status: 404,
        };
      }

      const user = await this.userService.getUserById(body.userId);
      if (!user) {
        this.setStatus(404);
        return {
          message: "User not found",
          status: 404,
        };
      }

      await this.contestService.editUserScoreInContest(
        id,
        body.userId,
        body.score,
      );

      this.setStatus(200);
      return {
        message: "User score edited successfully",
        status: 200,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        error: `Error editing user score ${err}`,
        status: 400,
        message: "User score not edited.",
      };
    }
  }

  @Patch("{id}/problem")
  @Tags("Contest")
  @Security("jwt", [Role.User])
  public async editProblem(
    @Path() id: number,
    @Body()
    body: {
      problemId: number;
      score?: number;
    },
  ): Promise<ApiResponse<null>> {
    try {
      const contest = await this.contestService.getContest(id);
      this.setStatus(404);
      if (!contest) {
        return {
          message: "Contest not found",
          status: 404,
        };
      }

      const problem = await this.problemService.getProblemById(body.problemId);
      if (!problem) {
        this.setStatus(404);
        return {
          message: "Problem not found",
          status: 404,
        };
      }

      await this.contestService.editProblemScore(
        id,
        body.problemId,
        body.score,
      );

      this.setStatus(200);
      return {
        message: "OK",
        status: 200,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        status: 400,
        error: `Error editing problem ${err}`,
        message: "Problem not edited.",
      }
    }
  }

  @Post("")
  @Tags("Contest")
  @Security("jwt", [Role.User])
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
  ): Promise<ApiResponse<null>> {
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
      const user = await this.userService.getUserById(organizerId);
      if (!user) {
        this.setStatus(400);
        return {
          message: "The creator of the contest cannot be found",
          status: 400,
          error: "User not found",
        };
      }

      await this.contestService.createContest({
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
        status: 200,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        message: "Contest not created",
        status: 400,
        error: `Error creating contest ${err}`,
      };
    }
  }

  @Post("{id}/register")
  @Tags("Contest")
  @Security("jwt", [Role.User])
  public async registerToContest(
    @Path() id: number,
    @Body() body: { userId: number },
  ): Promise<ApiResponse<null>> {
    const { userId } = body;

    try {
      const res = await this.contestService.getContest(id);
      if (!res) {
        this.setStatus(404);
        return {
          message: "Contest not found",
          status: 404,
        };
      }

      const user = await this.userService.getUserById(userId);
      if (!user) {
        this.setStatus(404);
        return {
          message: "User not found",
          status: 404,
        };
      }

      await this.contestService.addContestParticipation(id, userId);
      this.setStatus(201);
      return {
        message: "Registered successfully",
        status: 201,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        message: "Registration failed",
        status: 400,
        error: `Error registering to contest ${err}`,
      };
    }
  }

  @Post("{id}/problem")
  @Tags("Contest")
  @Security("jwt", [Role.User])
  public async addProblem(
    @Path() id: number,
    @Body() body: { problemId: number; score?: number },
  ): Promise<ApiResponse<null>> {
    const { problemId, score } = body;

    try {
      await this.contestService.addProblem(id, problemId, score);
      this.setStatus(200);
      return {
        status: 200,
        message: "Problem added to contest successfully",
      };
    } catch (err) {
      this.setStatus(400);
      return {
        status: 400,
        message: "Problem not added to contest",
        error: `Error adding problem to contest ${err}`,
      };
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
