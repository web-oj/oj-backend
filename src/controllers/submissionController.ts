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

@Route("submission")
export class SubmissionController extends Controller {
  private readonly submissionService: ISubmissionService;

  constructor() {
    super();
    this.submissionService = new SubmissionService();
  }

  @Post("submit")
  @Security("jwt", ["user"])
  public async submit(
    @Body() body: { userId: number; problem: string; code: string },
    @Header("x-access-token") token: string
  ) {
    const { problem, code } = body;
    const decoded: any = await new Promise((resolve, reject) => {
      jwt.verify(token, env.jwt_secret, (err: any, decoded: any) => {
        console.log(decoded);
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });

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