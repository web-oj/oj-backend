/**
 * @file user.ts
 * @summary User routes
 * @description Handles following routes:
 *      - GET '/:handle'
 *      - GET '/:id'
 *      - DELETE '/:id'
 *      - PATCH ':/id'
 *      - PATCH '/admin/:id'
 *      - POST '/createUser'
 *      - POST '/login'
 */

import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "@/controllers/userController";
import { UserService } from "@/services/impl/UserService";
import { auth } from "@/middleware/auth";

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

router.post("/login", async (req: Request, res: Response) => {
  const { password, email } = req.body;
  try {
    const result = await userController.login({ password, email });
    if (!result) {
      res.status(404).send(`Invalid email or password`);
    } else {
      res.status(200).send({
        message: "User logged in successfully",
        token: result,
      });
    }
  } catch (err) {
    res.status(500).send(`Error login: ${err}`);
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

router.get("/:handle", async (req: Request, res: Response) => {
  const handle = req.params.handle;
  try {
    const user = await userController.getUserByHandle(handle);
    if (!user) {
      res.status(404).send(`User not found`);
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

router.patch("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { handle, password, email } = req.body;
  try {
    const user = await userController.updateUser(id, {
      handle,
      password,
      email,
    });
    if (!user) {
      res.status(404).send(`User with id ${id} not found`);
    } else {
      res.status(200).send("User updated successfully");
    }
  } catch (err) {
    res.status(500).send(`Error updating user: ${err}`);
  }
});

router.patch(
  "admin/:id",
  (req: Request, res: Response, next: NextFunction) => {
    auth(req, res, next, ["AD"]);
  },
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const user = userController.addAdmin(id);
      if (!user) {
        res.status(404).send(`User with not found`);
      } else {
        res.status(200).send("Admin added successfully");
      }
    } catch (err) {
      res.status(500).send(`Error adding admin: ${err}`);
    }
  },
);

router.delete(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    auth(req, res, next, ["AD"]);
  },
  async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await userController.deleteUser(id);
      res.status(200).send("User deleted successfully");
    } catch (err) {
      res.status(500).send(`Error deleting user: ${err}`);
    }
  },
);

export default router;
