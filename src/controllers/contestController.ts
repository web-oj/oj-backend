/**
 * @file contestController.ts
 * @summary Contest controller class.
 * @description This file contains function(s) which call our respective service(s) to get the data.
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
import { IContestService } from "@/services/IContestService";
import { Body, Get, Path, Post, Route } from "tsoa";
import { Contest, ScoringRules } from "../entities/Contest";

@Route("contest")
export class ContestController {
  private readonly contestService: IContestService;

  constructor(contestService: IContestService) {
    this.contestService = contestService;
  }

  // @Post("create")
  // public async createContest(
  //   @Body()
  //   body: {
  //     title: string;
  //     description?: string;
  //     ruleText?: string;
  //     startTime: number;
  //     endTime: number;
  //     scoringRule: string;
  //     isPlagiarismCheckEnabled?: boolean;
  //     isPublished?: boolean;
  //   },
  // ) {
  //   const {
  //     title,
  //     description,
  //     ruleText,
  //     startTime,
  //     endTime,
  //     scoringRule,
  //     isPlagiarismCheckEnabled,
  //     isPublished,
  //   } = body;

  //   try {
  //     this.contestService.createContest({
  //       handle,
  //       password: hashedPassword,
  //       email,
  //     });
  //     return { message: "Contest created successfully" };
  //   } catch (err) {
  //     throw new Error(`Error creating contest: ${err}`);
  //   }
  // }

  @Get("{id}")
  public async getContestById(@Path() id: number): Promise<Contest | null> {
    try {
      const contest = await this.contestService.getContestById(id);
      return contest;
    } catch (err) {
      throw new Error(`Error getting contest: ${err}`);
    }
  }

  @Get("{handle}")
  public async getContestByHandle(
    @Path() handle: string,
  ): Promise<Contest | null> {
    try {
      const contest = await this.contestService.getContestByHandle(handle);
      return contest;
    } catch (err) {
      throw new Error(`Error getting contest: ${err}`);
    }
  }
}
