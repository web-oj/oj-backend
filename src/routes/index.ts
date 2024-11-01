import { Router } from "express";
import user from "./user/user";
import problem from "./problem/problem";
import tag from "./tag/tag";

const router = Router();

router.use("/user", user);
router.use("/problem", problem);
router.use("/tag", tag);

export default router;
