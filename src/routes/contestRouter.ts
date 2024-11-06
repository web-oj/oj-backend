/**
 * @file contestRouter.ts
 * @summary Contest routes
 * @description Handles following routes:
 *      - GET '/'
 *      - GET '/search'
 *      - GET '/:id'
 *      - GET '/:id/ranking'
 *      - DELETE '/:id'
 *      - PATCH '/:id'
 *      - PATCH '/:id/editScore'
 *      - POST '/create'
 *      - POST '/:id/register'
 */

import { Request, Response, Router } from "express";
import { ContestController } from "../controllers/contestController";
import { auth } from "../middleware/auth";
import { ContestService } from "../services/impl/ContestService";
import { Get } from "tsoa";
import { UserService } from "../services/impl/UserService";

const contestController = new ContestController(
  new ContestService(),
  new UserService(),
);

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await contestController.getAllContests(
      typeof req.query.limit !== "undefined"
        ? parseInt(req.query.limit as string)
        : undefined,
      typeof req.query.offset !== "undefined"
        ? parseInt(req.query.offset as string)
        : undefined,
    );
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

router.get("/search", async (req: Request, res: Response) => {
  try {
    const searchKeywords = req.query.searchKeywords as string | undefined;
    const startTimeLow =
      req.query.startTimeLow !== undefined
        ? parseInt(req.query.startTimeLow as string)
        : undefined;
    const startTimeHigh =
      req.query.startTimeHigh !== undefined
        ? parseInt(req.query.startTimeHigh as string)
        : undefined;
    const endTimeLow =
      req.query.endTimeLow !== undefined
        ? parseInt(req.query.endTimeLow as string)
        : undefined;
    const endTimeHigh =
      req.query.endTimeHigh !== undefined
        ? parseInt(req.query.endTimeHigh as string)
        : undefined;
    const limit =
      req.query.limit !== undefined
        ? parseInt(req.query.limit as string)
        : undefined;
    const offset =
      req.query.offset !== undefined
        ? parseInt(req.query.offset as string)
        : undefined;

    const response = await contestController.searchContests(
      searchKeywords,
      startTimeLow,
      startTimeHigh,
      endTimeLow,
      endTimeHigh,
      limit,
      offset,
    );
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const response = await contestController.getContestById(id);
    if (!response) {
      res.status(404).send(`Contest with id ${id} not found`);
    } else {
      res.status(200).send(response);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

router.post("/create", async (req, res) => {
  try {
    const response = await contestController.createContest(req.body);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

router.post("/:id/register", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await contestController.registerToContest(id, req.body);
    res.status(response.status).send(response);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// export type GetContestResponse = {
//   id: number;
//   handle: string;
//   email: string;
// };

export default router;
