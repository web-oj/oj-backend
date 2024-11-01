/**
 * @file tag.ts
 * @summary Tag routes
 * @description Handles following routes:
 *      - GET '/'
 *      - GET '/problem'
 *      - DELETE '/:id'
 *      - PATCH ':/id'
 *      - POST '/'
 */

import { Router } from "express";
import TagController from "../../controllers/tag";
import { auth } from "../../middleware/auth";

const router = Router();

router.get("/", TagController.getTags);
router.delete(
  "/:id",
  (req, res, next) => {
    auth(req, res, next, ["AD", "PS"]);
  },
  TagController.deleteTag,
);
router.get("/problem", TagController.getTagsByProblem);
router.post(
  "/",
  (req, res, next) => {
    auth(req, res, next, ["AD", "PS"]);
  },
  TagController.addTag,
);
router.patch(
  "/:id",
  (req, res, next) => {
    auth(req, res, next, ["AD", "PS"]);
  },
  TagController.updateTag,
);

export default router;
