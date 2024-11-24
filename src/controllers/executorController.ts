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
import { IExecutorService } from "@/services/IExecutorService";
import { ExecutorService } from "@/services/impl/ExecutorService";

@Route("executor")
export class ExecutorController extends Controller {
  private readonly executorService: IExecutorService;

  constructor() {
    super();
    this.executorService = new ExecutorService();
  }

  @Post("execute")
  @Security("jwt", ["user"])
  async execute(@Body() body: { code: string; stdin: string }) {
    const { code, stdin } = body;
    try {
      return await this.executorService.executeCode(code, "CPP", stdin);
    } catch (err) {
      throw new Error(`Error executing code: ${err}`);
    }
  }
}