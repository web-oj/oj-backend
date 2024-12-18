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

@Route("submission")
export class SubmissionController extends Controller {
  private readonly submissionService: ISubmissionService;
  private readonly problemService: IProblemService;

  constructor() {
    super();
    this.submissionService = new SubmissionService();
    this.problemService = new ProblemService();
  }

  @Post("submit")
  @Security("jwt", ["user"])
  public async submit(
    @Body() body: { userId: number; problemId: number; code: string },
    @Header("x-access-token") token: string
  ) {
    const { problemId, code } = body;
    const decoded = await decodeJWT(token);
    const problem = await this.problemService.getProblemById(problemId);

    if (!problem) {
      throw new Error("Problem not found");
    }

    try {
      await this.submissionService.submit(decoded.id, problem, code);
      return { message: "Submission created successfully" };
    } catch (err) {
      throw new Error(`Error creating submission: ${err}`);
    }
  }

  @Get('get_all_submissions/{id}')
  public async getAllSubmissions(@Path() id: number): Promise<Submission[] | null> {
    try {
      return await this.submissionService.getAllSubmissions(id);
    } catch (err) {
      throw new Error(`Error getting submissions: ${err}`);
    }
  }
}