import { Router } from "express";
import user from "./user/user";
import problem from "./problem/problem";

const router = Router();

router.use("/user", user);
router.use("/problem", problem);

export default router;
