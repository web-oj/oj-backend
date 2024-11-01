/**
 * @file problem.ts
 * @summary Problem routes
 * @description Handles following routes:
 *      - GET '/'
 *      - GET '/:id'
 *      - GET '/tag'
 *      - DELETE '/:id'
 *      - DELETE '/tag'
 *      - PATCH ':/id'
 *      - POST '/'
 *      - POST '/tag'
 */

import { Router } from "express";
import ProblemController from "../../controllers/problem";
import { auth } from "../../middleware/auth";

const router = Router();

router.get("/", ProblemController.getProblems);
router.get("/:id", ProblemController.getProblemsById);
router.get("/tag", ProblemController.getProblemsByTag);
router.delete(
  "/:id",
  (req, res, next) => {
    auth(req, res, next, ["AD", "PS"]);
  },
  ProblemController.deleteProblem,
);
router.delete(
  "/tag",
  (req, res, next) => {
    auth(req, res, next, ["AD", "PS"]);
  },
  ProblemController.deleteTaggedProblem,
);
router.patch(
  "/:id",
  (req, res, next) => {
    auth(req, res, next, ["AD", "PS"]);
  },
  ProblemController.updateProblem,
);
router.post(
  "/",
  (req, res, next) => {
    auth(req, res, next, ["AD", "PS"]);
  },
  ProblemController.addProblem,
);
router.post(
  "/tag",
  (req, res, next) => {
    auth(req, res, next, ["AD", "PS"]);
  },
  ProblemController.addTaggedProblem,
);

export default router;
