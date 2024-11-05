/**
 * @file contestRouter.ts
 * @summary Contest routes
 * @description Handles following routes:
 *      - GET '/'
 *      - GET '/:id'
 *      - DELETE '/:id'
 *      - PATCH ':/id'
 *      - PATCH '/role/:id'
 *      - POST '/'
 *      - POST '/login'
 *      - POST '/logout'
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
    const response = await contestController.getAllContests();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(`Error creating contest: ${err}`);
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
  }= req.body;
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

// router.get("/:id", async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   try {
//     const contest = await contestController.getContestById(id);
//     if (!contest) {
//       res.status(404).send(`Contest with id ${id} not found`);
//     } else {
//       const response: GetContestResponse = {
//         id: contest.id,
//         handle: contest.handle,
//         email: contest.email,
//       };
//       res.status(200).send(response);
//     }
//   } catch (err) {
//     res.status(500).send(`Error getting contest: ${err}`);
//   }
// });

export default router;
