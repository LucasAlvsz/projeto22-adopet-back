import { Router } from "express";
import { handleError } from "@/middlewares";
import authRouter from "./authRouter";
import petsRouter from "./petsRouter";
import healthRouter from "./healthRouter";
import chatRouter from "./chatRouter";

const router = Router();
router
  .use("/health", healthRouter)
  .use(authRouter)
  .use("/pets", petsRouter)
  .use(chatRouter)
  .use(handleError);
export default router;
