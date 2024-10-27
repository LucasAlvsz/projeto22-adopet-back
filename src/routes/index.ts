import { Router } from "express";
import { handleError } from "@/middlewares";
import authRouter from "./authRouter";
import petsRouter from "./petsRouter";
import healthRouter from "./healthRouter";
import breedsRouter from "./breedsRouter";

const router = Router();
router
  .use("/health", healthRouter)
  .use(authRouter)
  .use("/pets", petsRouter)
  .use("/breeds", breedsRouter);

export default router;
