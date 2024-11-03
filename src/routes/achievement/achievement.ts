/**
 * @file achievement.ts
 * @summary Achievement routes
 * @description Handles following routes:
 *      - GET '/user/:id'
 *      - GET '/:id'
 *      - DELETE '/:id'
 *      - PATCH ':/id'
 *      - POST '/'
 */

import { Router } from "express";
import AchievementController from "../../controllers/achievement";
import { auth } from "../../middleware/auth";

const router = Router();

router.get("/:id", AchievementController.getAchievementById);
router.get("/user/:id", AchievementController.getAchievementByUser);
router.delete(
  "/:id",
  (req, res, next) => {
    auth(req, res, next, ["AD"]);
  },
  AchievementController.deleteAchievement,
);
router.patch(
  "/:id",
  (req, res, next) => {
    auth(req, res, next, ["AD"]);
  },
  AchievementController.updateAchievement,
);
router.post(
  "/",
  (req, res, next) => {
    auth(req, res, next, ["AD"]);
  },
  AchievementController.addAchievement,
);
