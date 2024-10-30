/**
 * @file achievement.ts
 * @summary Achievement controller class.
 * @description This file contains function(s) which call our respective service(s) to get the data.
 * @function
 *          - addAchievement()
 *          - updateAchievement()
 *          - getAchievementById()
 *          - getAchievementsByUser()
 *          - deleteAchievement()
 * @return Express JSON Response
 */

import { Request, Response } from "express";
import Database from "../services/Database";

export default class AchievementController {
  public static async addAchievement(req: Request, res: Response) {
    const body = req.body;

    await Database.queryAddAchievement(body.userId, body.title)
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

  public static async updateAchievement(req: Request, res: Response) {
    const body = req.body;
    const id = parseInt(req.params.id);

    await Database.queryEditAchievementAttr(
      id,
      body.title,
      body.attachment,
      body.isVerified,
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

  public static async deleteAchievement(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    await Database.queryDeleteAchievement(id)
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

  public static async getAchievementById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    await Database.queryGetAchievementById(id)
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

  public static async getAchievementByUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);

    await Database.queryGetAchievementsByUser(userId)
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
