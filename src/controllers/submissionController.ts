/**
 * @summary Submission controller class.
 * @description This file contains function(s) which call our respective service(s) to get the data.
 * @function
 *          - submit()
 *          - getAllSubmissions()
 * @return User information
 */

import { ISubmissionService } from "@/services/ISubmissionService";

import { Submission } from "../entities/Submission";
import { Body, Controller, Get, Header, Path, Post, Route, Security } from "tsoa";
import { SubmissionService } from "@/services/impl/SubmissionService";
import jwt from "jsonwebtoken";
import { env } from "@/config/config";
import { decodeJWT } from "@/middleware/authentication";
import { ProblemService } from "@/services/impl/ProblemService";
import { IProblemService } from "@/services/IProblemService";
import { IContestService } from "@/services/IContestService";
import { ProblemInContest } from "@/entities/ProblemInContest";
import { ContestService } from "@/services/impl/ContestService";
import { error } from "console";
import { Role } from "@/types/types";

@Route("submission")
export class SubmissionController extends Controller {
  private readonly submissionService: ISubmissionService;
  private readonly problemService: IProblemService;
  private readonly contestService: IContestService;

  constructor() {
    super();
    this.submissionService = new SubmissionService();
    this.problemService = new ProblemService();
    this.contestService = new ContestService();
  }

  @Post("")
  public async submit(
    @Body() body: { problemId: number; contestId?: number, code: string },
    @Header("x-access-token") token: string
  ) {
    const { problemId, code, contestId } = body;
    const decoded = await decodeJWT(token);
    try {
      const submissionId = await this.submissionService.submit(decoded.id, problemId, code, contestId);
      return { submissionId, message: "Submission created successfully" };
    } catch (err) {
      const error = `Error creating submission: ${err}`;
      this.setStatus(400);
      return { error };
    }  

  }

  @Post('/execute')
  public async executeSubmission(@Body() body: { submissionId: number }) {
    const { submissionId } = body;
    try {
      await this.submissionService.executeSubmission(submissionId);
      this.setStatus(200);
      return {
        message: "Submission executed",
      }
    } catch (err) {
      const error = `Error executing submission: ${err}`;
      this.setStatus(400);
      return { error };
    }
  }

  @Get("{id}")
  public async getSubmissionById(@Path() id: number) {
    try {
      const submission = await this.submissionService.getSubmissionById(id, {
        withResult: true,
      });
      if (!submission) {
        this.setStatus(404);
        return {
          error: "Submission not found",
        }
      }
      return {
        data: submission,
      };
    } catch (err) {
      const error = `Error getting submission: ${err}`;
      this.setStatus(400);
      return { error };
    }
  }

  @Get('/execute?code={code}&stdin={stdin}')
  public async executeCode(@Path() code: string, stdin: string): Promise<string> {
    try {
      return await this.submissionService.executeCode(code, stdin);
    } catch (err) {
      throw new Error(`Error executing code: ${err}`);
    }
  }
}