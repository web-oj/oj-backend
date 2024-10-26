/**
 * @file user.ts
 * @summary User routes
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

import { Router } from "express";
import { UserController } from "../../controllers";
import { auth } from "../../middleware/auth";

const router = Router();

router.get(
  "/:id",
  (req, res, next) => {
    auth(req, res, next, ["AD", "PS", "CU"]);
  },
  UserController.getUserById,
);
router.get("/", UserController.getUsers);
router.delete(
  "/:id",
  (req, res, next) => {
    auth(req, res, next, ["AD"]);
  },
  UserController.deleteUser,
);
router.patch(
  "/:id",
  (req, res, next) => {
    auth(req, res, next, ["AD", "PS", "CU"]);
  },
  UserController.updateUser,
);
router.patch(
  "/role/:id",
  (req, res, next) => {
    auth(req, res, next, ["AD"]);
  },
  UserController.updateUserRole,
);
router.post("/", UserController.addUser);
router.post("/login", UserController.login);
router.post(
  "/logout",
  (req, res, next) => {
    auth(req, res, next, ["AD", "PS", "CU"]);
  },
  UserController.logout,
);

export default router;
