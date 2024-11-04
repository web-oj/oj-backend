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

import { Request, Response, Router } from "express";
import { UserController } from "../controllers/userController";
import { auth } from "../middleware/auth";
import { UserService } from "../services/impl/UserService";
import { Get } from "tsoa";

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.post("/createUser", (req, res) => {
  const { handle, password, email } = req.body;
  try {
    userController.createUser({ handle, password, email });
    res.status(200).send("User created successfully");
  } catch (err) {
    res.status(500).send(`Error creating user: ${err}`);
  }
});

export type GetUserResponse = {
  id: number;
  handle: string;
  email: string;
};

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const user = await userController.getUserById(id);
    if (!user) {
      res.status(404).send(`User with id ${id} not found`);
    } else {
      const response: GetUserResponse = {
        id: user.id,
        handle: user.handle,
        email: user.email,
      };
      res.status(200).send(response);  
    }
  } catch (err) {
    res.status(500).send(`Error getting user: ${err}`);
  }
});

export default router;
