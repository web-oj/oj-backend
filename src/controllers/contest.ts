/**
 * @file contest.ts
 * @summary Contest controller class.
 * @description This file contains function(s) which call our respective service(s) to get the data.
 * @function
 *          - addContest()
 *          - addProblemToContest()
 *          - deleteContest()
 *          - deleteProblemFromContest()
 *          - getContestById()
 *          - getContests()
 *          - getContestRanking()
 *          - getSolvedProblemsInContestByUser()
 *          - getProblemsFromContest()
 *          - getOfficialSubmissionsInContest()
 *          - updateContest()
 *          - updateProblemPointInContest()
 * @return Express JSON Response
 */

import { Request, Response } from "express";
import Database from "../services/Database";

export default class ContestController {
  public static async addContest(req: Request, res: Response) {
    const body = req.body;

    await Database.queryAddContest(
      body.title,
      body.description,
      body.startTime,
      body.endTime,
      body.scoringRule,
      body.organizerId,
      body.isPublished,
      body.isPlagiarismCheckEnabled,
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

  public static async updateContest(req: Request, res: Response) {
    const body = req.body;

    await Database.queryEditContest(
      body.contestId,
      body.title,
      body.description,
      body.startTime,
      body.endTime,
      body.scoringRule,
      body.organizerId,
      body.isPublished,
      body.isPlagiarismCheckEnabled,
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

  public static async deleteContest(req: Request, res: Response) {
    const body = req.body;

    await Database.queryDeleteContest(body.contestId)
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

  public static async getContestById(req: Request, res: Response) {
    const body = req.body;

    await Database.queryGetContestById(body.contestId)
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

  public static async getContests(req: Request, res: Response) {
    const body = req.body;

    await Database.queryFindContests(
      body.contestId,
      body.title,
      body.scoringRule,
      body.organizerId,
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

  public static async addProblemToContest(req: Request, res: Response) {
    const body = req.body;

    await Database.queryAddProblemToContest(
      body.contestId,
      body.problemId,
      body.point,
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

  public static async updateProblemPointInContest(req: Request, res: Response) {
    const body = req.body;

    await Database.queryEditProblemPointInContest(
      body.contestId,
      body.problemId,
      body.point,
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

  public static async deleteProblemFromContest(req: Request, res: Response) {
    const body = req.body;

    await Database.queryDeleteProblemFromContest(body.contestId, body.problemId)
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

  public static async getProblemFromContest(req: Request, res: Response) {
    const body = req.body;

    await Database.queryGetProblemsInContest(body.contestId)
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

  public static async getOfficialSubmissionsInContest(
    req: Request,
    res: Response,
  ) {
    const body = req.body;

    await Database.queryFindOfficialSubmissionsInContests(
      body.contestId,
      body.userId,
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

  public static async getContestRanking(req: Request, res: Response) {
    const body = req.body;

    await Database.queryGetContestRanking(body.contestId)
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

  public static async getSolvedProblemsInContestByUser(
    req: Request,
    res: Response,
  ) {
    const body = req.body;

    await Database.queryGetSolvedProblemsInContestByUser(
      body.contestId,
      body.userId,
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
}
