/**
 * @file problem.ts
 * @summary Problem controller class.
 * @description This file contains function(s) which call our respective service(s) to get the data.
 * @function
 *          - addProblem()
 *          - addTaggedProblem()
 *          - deleteProblem()
 *          - deleteTaggedProblem()
 *          - getProblemById()
 *          - getProblems()
 *          - getProblemsByTag()
 *          - updateProblem()
 * @return Express JSON Response
 */

import { Request, Response } from "express";
import Database from "../services/Database";

export default class ProblemController {
  public static async addProblem(req: Request, res: Response) {
    const body = req.body;

    await Database.queryAddProblem(
      body.title,
      body.statement,
      body.difficulty,
      body.timeLimit,
      body.memoryLimit,
      body.inputFormat,
      body.outputFormat,
      body.solutionText,
      body.creatorId,
      body.isPublished,
    )
      .then(() => {
        return res.status(200).send({
          status: "success",
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async addTaggedProblem(req: Request, res: Response) {
    const body = req.body;

    await Database.queryAddTaggedProblem(body.problemId, body.tagId)
      .then(() => {
        return res.status(200).send({
          status: "success",
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async deleteProblem(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    await Database.queryDeleteProblem(id)
      .then(() => {
        return res.status(200).send({
          status: "success",
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async deleteTaggedProblem(req: Request, res: Response) {
    const body = req.body;

    await Database.queryDeleteTaggedProblem(body.problemId, body.tagId)
      .then(() => {
        return res.status(200).send({
          status: "success",
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async updateProblem(req: Request, res: Response) {
    const body = req.body;
    const id = parseInt(req.params.id);

    await Database.queryEditProblemAttr(
      id,
      body.title,
      body.statement,
      body.difficulty,
      body.timeLimit,
      body.memoryLimit,
      body.inputFormat,
      body.outputFormat,
      body.solutionText,
      body.creatorId,
      body.isPublished,
    )
      .then(() => {
        return res.status(200).send({
          status: "success",
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async getProblems(req: Request, res: Response) {
    const body = req.body;

    await Database.queryFindProblems(
      body.problemId,
      body.title,
      body.difficultyLow,
      body.difficultyHigh,
      body.createdAtLow,
      body.createdAtHigh,
      body.creatorId,
      body.isPublished,
    )
      .then((result) => {
        return res.status(200).send({
          status: "success",
          data: JSON.parse(result.toString()),
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async getProblemsById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    await Database.queryGetProblemById(id)
      .then((result) => {
        return res.status(200).send({
          status: "success",
          data: JSON.parse(result.toString()),
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }

  public static async getProblemByTag(req: Request, res: Response) {
    const body = req.body;

    await Database.queryEditTagAttr(
      body.tagId,
      body.tagName,
      body.tagType,
      true,
    )
      .then(async () => {
        await Database.queryFindProblemsWithTags(
          body.problemId,
          body.title,
          body.difficultyLow,
          body.difficultyHigh,
          body.createdAtLow,
          body.createdAtHigh,
          body.creatorId,
          body.isPublished,
        ).then((result) => {
          return res.status(200).send({
            status: "success",
            data: JSON.parse(result.toString()),
          });
        });
      })
      .catch((err: Error) => {
        return res.status(500).send({
          status: "error",
          message: `Database query error: ${err}`,
        });
      });
  }
}
