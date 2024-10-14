import express, { Request, Response, Router } from "express";
import PingController from "../controllers/ping";

const router: Router = express.Router();

router.get("/ping", async (req: Request, res: Response) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  res.send(response);
  return;
});

export default router;