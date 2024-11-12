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
} from "tsoa";
import { IProblemService } from "@/services/IProblemService";
import jwt from "jsonwebtoken";
import { env } from "@/config/config";
import { ProblemService } from "@/services/impl/ProblemService";

export type GetAllProblemResponseEntity = {
  id: number;
  title: string;
  statement: string;
  difficulty: number;
  timeLimit: number;
  memoryLimit: number;
  createdAt: string;
  createdBy: number;
};

export type ProblemResponse = {
  message: string;
  status: number;
  data?: GetAllProblemResponseEntity[] | null;
};

export type ProblemRequestBody = {
  title: string;
  statement: string;
  difficulty: number;
  timeLimit: number;
  memoryLimit: number;
  inputFormat?: string;
  outputFormat?: string;
  solutionText?: string;
  isPublished?: boolean;
};

@Route("problem")
export class ProblemController extends Controller {
  private readonly problemService: IProblemService;

  constructor() {
    super();
    this.problemService = new ProblemService();
  }

  @Post("create_problem")
  @Security("jwt", ["admin"])
  public async createProblem(
    @Body() body: ProblemRequestBody,
    @Header("x-access-token") token: string,
  ) {
    try {
      const decoded: any = await new Promise((resolve, reject) => {
        jwt.verify(token, env.jwt_secret, (err: any, decoded: any) => {
          console.log(decoded);
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        });
      });

      await this.problemService.createProblem({
        ...body,
        creatorId: decoded.id,
      });
      return {
        message: "Problem created successfully.",
      };
    } catch (err) {
      throw new Error(`Error creating problem: ${err}`);
    }
  }

  @Patch("id/{id}")
  @Security("jwt", ["admin"])
  public async updateProblem(
    @Body() body: ProblemRequestBody,
    @Header("x-access-token") token: string,
    @Path() id: number,
  ) {
    try {
      const decoded: any = await new Promise((resolve, reject) => {
        jwt.verify(token, env.jwt_secret, (err: any, decoded: any) => {
          console.log(decoded);
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

  @Get("id/{id}")
  public async getProblemById(@Path() id: number) {
    try {
      return await this.problemService.getProblemById(id);
    } catch (err) {
      throw new Error(`Error getting problem: ${err}`);
    }
  }

  @Get("title/{title}")
  public async getProblemTitle(@Path() title: string) {
    try {
      return await this.problemService.getProblemByTitle(title);
    } catch (err) {
      throw new Error(`Error getting problem: ${err}`);
    }
  }

  @Get("")
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
  @Security("jwt", ["admin"])
  public async softDeleteProblem(
    @Path() id: number,
    @Header("x-access-token") token: string,
  ) {
    try {
      const decoded: any = await new Promise((resolve, reject) => {
        jwt.verify(token, env.jwt_secret, (err: any, decoded: any) => {
          console.log(decoded);
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
