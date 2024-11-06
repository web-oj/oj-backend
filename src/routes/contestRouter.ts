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

const contestService = new ContestService();
const contestController = new ContestController(contestService);

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
    res.status(500).send(`Error creating contest: ${err}`);
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
    res.status(500).send(`Error searching contests: ${err}`);
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
    res.status(500).send(`Error getting contest: ${err}`);
  }
});

router.post("/create", async (req, res) => {
  const {
    title,
    description,
    ruleText,
    startTime,
    endTime,
    scoringRule,
    isPlagiarismCheckEnabled,
    isPublished,
    organizerId,
  } = req.body;
  try {
    await contestController.createContest({
      title,
      description,
      ruleText,
      startTime,
      endTime,
      scoringRule,
      isPlagiarismCheckEnabled,
      isPublished,
      organizerId,
    });
    res.status(200).send("Contest created successfully");
  } catch (err) {
    res.status(500).send(`Error creating contest: ${err}`);
  }
});

// export type GetContestResponse = {
//   id: number;
//   handle: string;
//   email: string;
// };

export default router;
