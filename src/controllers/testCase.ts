/**
 * @file testCase.ts
 * @summary Test case controller class.
 * @description This file contains function(s) which call our respective service(s) to get the data.
 * @function
 *          - addTestCase()
 *          - deleteTestCase()
 *          - getTestCases()
 *          - getTestCaseById()
 *          - updateTestCase()
 * @return Express JSON Response
 */

import { Request, Response } from "express";
import Database from "../services/Database";

export default class TestCase {
  public static async addTestCase(req: Request, res: Response): Promise<void> {
    const body = req.body;

    await Database.queryAddTestCase(
      body.title,
      body.problemId,
      body.input,
      body.expectedOutput,
      body.isHidden,
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

  public static async deleteTestCase(
    req: Request,
    res: Response,
  ): Promise<void> {
    const body = req.body;

    await Database.queryDeleteTestCase(body.testCaseId)
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

  public static async updateTestCase(
    req: Request,
    res: Response,
  ): Promise<void> {
    const body = req.body;

    await Database.queryEditTestCase(
      body.testCaseId,
      body.title,
      body.problemId,
      body.input,
      body.expectedOutput,
      body.isHidden,
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

  public static async getTestCases(req: Request, res: Response): Promise<void> {
    const body = req.body;

    await Database.queryFindTestCases(
      body.testCaseId,
      body.title,
      body.problemId,
      body.isHidden,
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

  public static async getTestCaseById(
    req: Request,
    res: Response,
  ): Promise<void> {
    const body = req.body;

    await Database.queryGetTestCaseById(body.testCaseId)
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
