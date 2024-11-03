import { Router } from "express";
import { handleError } from "@/middlewares";
import authRouter from "./authRouter";
import petsRouter from "./petsRouter";
import healthRouter from "./healthRouter";

const router = Router();
router.use("/health", healthRouter).use(authRouter).use("/pets", petsRouter);
export default router;
