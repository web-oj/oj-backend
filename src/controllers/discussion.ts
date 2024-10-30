/**
 * @file discussion.ts
 * @summary Discussion messages controller class.
 * @description This file contains function(s) which call our respective service(s) to get the data.
 * @function
 *          - addDiscussionMessage()
 *          - updateDiscussionMessage()
 *          - getDiscussionMessages()
 *          - getRootDiscussionMessages()
 *          - deleteDiscussionMessage()
 * @return Express JSON Response
 */

import { Request, Response } from "express";
import Database from "../services/Database";

export default class DiscussionController {
  public static async addDiscussionMessage(req: Request, res: Response) {
    const body = req.body;

    await Database.queryAddDiscussionMessage(
      body.senderId,
      body.problemId,
      body.parentId,
      body.content,
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

  public static async deleteDiscussionMessage(req: Request, res: Response) {
    const body = req.body;

    await Database.queryDeleteDiscussionMessage(body.messageId)
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

  public static async updateDiscussionMessage(req: Request, res: Response) {
    const body = req.body;

    await Database.queryEditDiscussionMessageAttr(
      body.messageId,
      body.senderId,
      body.problemId,
      body.parentId,
      body.content,
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

  public static async getDiscussionMessages(req: Request, res: Response) {
    const body = req.body;

    await Database.queryFindDiscussionMessages(
      body.messageId,
      body.senderId,
      body.problemId,
      body.parentId,
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

  public static async getRootDiscussionMessages(req: Request, res: Response) {
    const body = req.body;

    await Database.queryFindRootDiscussionMessages(
      body.messageId,
      body.senderId,
      body.problemId,
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
