/**
 * @file tag.ts
 * @summary Tag controller class.
 * @description This file contains function(s) which call our respective service(s) to get the data.
 * @function
 *          - addTag()
 *          - deleteTag()
 *          - getTags()
 *          - getTagsByProblem()
 *          - updateTag()
 * @return Express JSON Response
 */

import { Request, Response } from "express";
import Database from "../services/Database";

export default class TagController {
  public static async addTag(req: Request, res: Response) {
    const body = req.body;

    await Database.queryAddTag(body.tagName, body.tagType)
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

  public static async deleteTag(req: Request, res: Response) {
    const id = parseInt(req.params.tagId);

    await Database.queryDeleteTag(id)
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

  public static async getTags(req: Request, res: Response) {
    const body = req.body;

    await Database.queryFindTags(
      body.tagId,
      body.tagName,
      body.tagType,
      body.isSelected,
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

  public static async updateTag(req: Request, res: Response) {
    const body = req.body;
    const id = parseInt(req.params.tagId);

    await Database.queryEditTagAttr(
      id,
      body.tagName,
      body.tagType,
      body.isSelected,
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

  public static async getTagsByProblem(req: Request, res: Response) {
    const body = req.body;

    await Database.queryFindTagsByProblem(body.problemId)
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
