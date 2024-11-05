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
import { Body, Get, Path, Post, Query, Route } from "tsoa";
import { Contest } from "../entities/Contest";

export type GetAllContestsResponseEntry = {
  id: number;
  title: string;
  startTime: number;
  endTime: number;
};

@Route("contest")
export class ContestController {
  private readonly contestService: IContestService;

  constructor(contestService: IContestService) {
    this.contestService = contestService;
  }

  @Get("")
  public async getAllContests(
    @Query() limit?: number,
    @Query() offset?: number,
  ): Promise<GetAllContestsResponseEntry[] | null> {
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
      return response;
    } catch (err) {
      throw new Error(`Error getting contest: ${err}`);
    }
  }

  @Get("{id}")
  public async getContestById(@Path() id: number): Promise<Contest | null> {
    try {
      const contest = await this.contestService.getContestById(id);
      return contest;
    } catch (err) {
      throw new Error(`Error getting contest: ${err}`);
    }
  }

  @Post("create")
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
  ) {
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
      return { message: "Contest created successfully" };
    } catch (err) {
      throw new Error(`Error creating contest: ${err}`);
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
