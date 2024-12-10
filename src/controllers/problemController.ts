/**
 * @file problemController.ts
 * @summary Problem controller class.
 * @description This file contains function(s) which call our respective service(s) to get the data.
 * @function
 *          - createProblem()
 *          - updateProblem()
 *          - softDeleteProblem()
 *          - getProblemById()
 *          - getProblemByTitle()
 *          - getAllProblems()
 *          - searchProblems()
 * @return ProblemResponse
 */

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
import { IProblemService } from "@/services/IProblemService";
import { ProblemService } from "@/services/impl/ProblemService";
import { decodeJWT } from "@/middleware/authentication";
import { ApiResponse, GetAllProblemsResponse, GetProblemResponse, NewProblemRequest, Role, TokenInfo, UpdateProblemRequest } from "../types/types";

@Route("problem")
export class ProblemController extends Controller {
  private readonly problemService: IProblemService;

  constructor() {
    super();
    this.problemService = new ProblemService();
  }

  @Post("")
  @Tags("Problem")
  @Security("jwt", [Role.User])
  public async createProblem(
    @Body() body: NewProblemRequest,
    @Header("x-access-token") token: string,
  ): Promise<ApiResponse<null>> {
    try {
      const decoded: TokenInfo = await decodeJWT(token);

      await this.problemService.createProblem({
        ...body,
        creatorId: decoded.id,
      });
      this.setStatus(200);
      return {
        message: "Problem created successfully.",
        status: 200,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        error: `Error creating problem ${err}`,
        status: 400,
        message: "Problem not created.",
      }      
    }
  }

  @Patch("{id}")
  @Tags("Problem")
  @Security("jwt", [Role.User])
  public async updateProblem(
    @Body() body: UpdateProblemRequest,
    @Header("x-access-token") token: string,
    @Path() id: number,
  ): Promise<ApiResponse<null>> {
    try {
      const decoded = await decodeJWT(token);

      const oldProblem = await this.problemService.getProblemById(id);
      
      if (oldProblem?.owner.id === decoded.id) {
        await this.problemService.editProblem(id, body);
        return {
          message: "Problem updated successfully.",
          status: 200,
        };
      } else {
        this.setStatus(403);
        return {
          message: "Forbidden",
          error: "You are not the owner of this problem.",
          status: 403,
        };
      }
    } catch (err) {
      this.setStatus(400);
      return {
        message: "Problem not updated.",
        error: `Error updating problem: ${err}`,
        status: 400,
      };
    }
  }

  @Post("/{id}/testcase")
  @Tags("Problem")
  public async addTestcase(
    @Body() body: { input: string; output: string },
    @Path() id: number,
  ): Promise<ApiResponse<null>> {
    try {
      await this.problemService.addTestcase(id, body.input, body.output);
      this.setStatus(200);
      return {
        message: "Testcase added successfully.",
        status: 200,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        message: "Testcase not added.",
        status: 400,
        error: `Error adding testcase: ${err}`,
      }
    }
  }

  @Post("/{id}/testcases")
  @Tags("Problem")
  public async addTestcases(
    @Body() body: { testcases: { input: string; output: string }[] },
    @Path() id: number,
  ): Promise<ApiResponse<null>> {
    try {
      for (let testcase of body.testcases) {
        await this.addTestcase({ input: testcase.input, output: testcase.output }, id);
      }
      this.setStatus(200);
      return {
        message: "Testcases added successfully.",
        status: 200,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        status: 400,
        message: "Testcases not added.",
        error: `Error adding testcases: ${err}`,
      }
    }
}

  @Get("id/{id}")
  @Tags("Problem")
  public async getProblemById(@Path() id: number): Promise<ApiResponse<GetProblemResponse>> {
    try {
      const problem = await this.problemService.getProblemById(id);
      if (problem === null) {
        this.setStatus(404);
        return {
          message: "Problem not found.",
          status: 404,
          error: "Problem not found.",
        };
      } else {
        this.setStatus(200);
        return {
          message: "Problem retrieved successfully.",
          status: 200,
          data: problem,
        }
      }
    } catch (err) {
      this.setStatus(400);
      return {
        message: "Problem not retrieved.",
        status: 400,
        error: `Error getting problem: ${err}`,
      }
    }
  }

  @Get("title/{title}")
  @Tags("Problem")
  public async getProblemByTitle(@Path() title: string): Promise<ApiResponse<GetProblemResponse>> {
    try {
      const problem = await this.problemService.getProblemByTitle(title);
      if (problem === null) {
        this.setStatus(404);
        return {
          message: "Problem not found.",
          status: 404,
          error: "Problem not found.",
        };
      } else {
        this.setStatus(200);
        return {
          message: "Problem retrieved successfully.",
          status: 200,
          data: problem,
        }
      }
    } catch (err) {
      this.setStatus(400);
      return {
        message: "Problem not retrieved.",
        status: 400,
        error: `Error getting problem: ${err}`,
      }
    }
  }

  @Get("")
  @Tags("Problem")
  public async getAllProblems(
    @Query() limit?: number,
    @Query() offset?: number,
  ): Promise<ApiResponse<GetAllProblemsResponse>> {
    try {
      let allProblem = await this.problemService.getAllProblems(limit, offset, false);
      this.setStatus(200);
      return {
        status: 200,
        message: `Problems founded.`,
        data: allProblem,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        status: 400,
        message: "Problems not founded.",
        error: `Error getting all problems: ${err}`,
      };
    }
  }

  @Delete("id/{id}")
  @Tags("Problem")
  @Security("jwt", [Role.Admin])
  public async softDeleteProblem(
    @Path() id: number,
    @Header("x-access-token") token: string,
  ): Promise<ApiResponse<null>> {
    try {
      const decoded = await decodeJWT(token);

      let problem = await this.problemService.getProblemById(id);
      if (problem?.owner.id === decoded.id) {
        await this.problemService.softDeleteProblem(id);
        this.setStatus(200);
        return {
          message: "Problem deleted successful",
          status: 200,
        };
      } else {
        this.setStatus(403);
        return {
          status: 403,
          error: "You are not the owner of this problem.",
          message: "Forbidden",
        };
      }
    } catch (err) {
      this.setStatus(400);
      return {
        message: "Problem not deleted",
        status: 400,
        error: `Error deleting problem: ${err}`,
      };
    }
  }

  @Get("search")
  @Tags("Problem")
  public async searchProblems(
    @Query() searchKeyword?: string,
    @Query() difficultyLow?: number,
    @Query() difficultyHigh?: number,
    @Query() offset?: number,
    @Query() limit?: number,
  ): Promise<ApiResponse<GetAllProblemsResponse>> {
    try {
      if (difficultyLow === undefined) {
        difficultyLow = 0;
      }
      if (difficultyHigh == undefined) {
        difficultyHigh = 2 ** 63 - 1;
      }

      const problems = await this.problemService.searchProblems(
        searchKeyword,
        difficultyLow,
        difficultyHigh,
        limit,
        offset,
      );
      return {
        message: "Searching successful",
        status: 200,
        data: problems,
      };
    } catch (err) {
      this.setStatus(400);
      return {
        message: "Searching not successful",
        status: 400,
        error: `Error searching problem: ${err}`,
      };
    }
  }
}
