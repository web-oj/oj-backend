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
import jwt from "jsonwebtoken";
import { env } from "@/config/config";
import { ProblemService } from "@/services/impl/ProblemService";
import { decodeJWT } from "@/middleware/authentication";
import { GetAllProblemResponseEntity, ProblemRequestBody, ProblemResponse, TokenInfo } from "../types/types";

@Route("problem")
export class ProblemController extends Controller {
  private readonly problemService: IProblemService;

  constructor() {
    super();
    this.problemService = new ProblemService();
  }

  @Post("")
  @Tags("Problem")
  @Security("jwt", ["user"])
  public async createProblem(
    @Body() body: ProblemRequestBody,
    @Header("x-access-token") token: string,
  ) {
    try {
      const decoded: TokenInfo = await decodeJWT(token);

      await this.problemService.createProblem({
        ...body,
        creatorId: decoded.id,
      });
      return {
        message: "Problem created successfully.",
      };
    } catch (err) {
      this.setStatus(400);
      return {
        error: `Error creating problem ${err}`,
      }      
    }
  }

  @Patch("id/{id}")
  @Tags("Problem")
  @Security("jwt", ["admin"])
  public async updateProblem(
    @Body() body: ProblemRequestBody,
    @Header("x-access-token") token: string,
    @Path() id: number,
  ) {
    try {
      const decoded: any = await new Promise((resolve, reject) => {
        jwt.verify(token, env.jwt_secret, (err: any, decoded: any) => {
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        });
      });

      const oldProblem = await this.problemService.getProblemById(id);
      if (oldProblem?.createdBy === decoded.id) {
        await this.problemService.editProblem(id, body);
        return {
          message: "Problem updated successfully.",
        };
      } else {
        this.setStatus(403);
        return {
          message: "Forbidden",
        };
      }
    } catch (err) {
      throw new Error(`Error updating problem: ${err}`);
    }
  }

  @Post("/{id}/testcase")
  @Tags("Problem")
  public async addTestcase(
    @Body() body: { input: string; output: string },
    @Path() id: number,
  ) {
    try {
      await this.problemService.addTestcase(id, body.input, body.output);
      this.setStatus(200);
      return {
        message: "Testcase added successfully.",
      };
    } catch (err) {
      return {
        error: `Error adding testcase: ${err}`,
      }
    }
  }

  @Post("/{id}/testcases")
  @Tags("Problem")
  public async addTestcases(
    @Body() body: { testcases: { input: string; output: string }[] },
    @Path() id: number,
  ) {
    try {
      for (let testcase of body.testcases) {
        await this.addTestcase({ input: testcase.input, output: testcase.output }, id);
      }
      this.setStatus(200);
      return {
        message: "Testcases added successfully.",
      };
    } catch (err) {
      return {
        error: `Error adding testcases: ${err}`,
      }
    }
  }

  @Get("id/{id}")
  @Tags("Problem")
  public async getProblemById(@Path() id: number) {
    try {
      return await this.problemService.getProblemById(id);
    } catch (err) {
      throw new Error(`Error getting problem: ${err}`);
    }
  }

  @Get("title/{title}")
  @Tags("Problem")
  public async getProblemTitle(@Path() title: string) {
    try {
      return await this.problemService.getProblemByTitle(title);
    } catch (err) {
      throw new Error(`Error getting problem: ${err}`);
    }
  }

  @Get("")
  @Tags("Problem")
  public async getAllProblems(
    @Query() limit?: number,
    @Query() offset?: number,
  ): Promise<ProblemResponse> {
    try {
      let allProblem = await this.problemService.getAllProblems(limit, offset);

      let response: GetAllProblemResponseEntity[] = [];
      if (allProblem !== null) {
        for (let problem of allProblem) {
          if (problem.isPublished) {
            response.push({
              createdAt: problem.createdAt.toString(),
              createdBy: problem.createdBy,
              difficulty: problem.difficulty,
              id: problem.id,
              memoryLimit: problem.memoryLimit,
              statement: problem.statement,
              timeLimit: problem.timeLimit,
              title: problem.title,
            });
          }
        }
      }
      return {
        status: 200,
        message: `Problems founded.`,
        data: response,
      };
    } catch (err) {
      throw new Error(`Error getting all problems: ${err}`);
    }
  }

  @Delete("id/{id}")
  @Tags("Problem")
  @Security("jwt", ["admin"])
  public async softDeleteProblem(
    @Path() id: number,
    @Header("x-access-token") token: string,
  ) {
    try {
      const decoded: any = await new Promise((resolve, reject) => {
        jwt.verify(token, env.jwt_secret, (err: any, decoded: any) => {
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        });
      });

      let problem = await this.problemService.getProblemById(id);
      if (problem?.createdBy === decoded.id) {
        await this.problemService.softDeleteProblem(id);
        return {
          message: "Problem deleted successful",
        };
      } else {
        this.setStatus(403);
        return {
          message: "Forbidden",
        };
      }
    } catch (err) {
      throw new Error(`Error deleting problem: ${err}`);
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
  ): Promise<ProblemResponse> {
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
      let response: GetAllProblemResponseEntity[] = [];
      if (problems !== null) {
        for (let problem of problems) {
          if (problem.isPublished) {
            response.push({
              createdAt: problem.createdAt.toString(),
              createdBy: problem.createdBy,
              difficulty: problem.difficulty,
              id: problem.id,
              memoryLimit: problem.memoryLimit,
              statement: problem.statement,
              timeLimit: problem.timeLimit,
              title: problem.title,
            });
          }
        }
      }
      return {
        message: "Searching successful",
        status: 200,
        data: response,
      };
    } catch (err) {
      throw new Error(`Error searching problem: ${err}`);
    }
  }
}
