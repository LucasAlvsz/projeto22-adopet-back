import { Router } from "express"
import "express-async-errors"

import handleError from "@/middlewares/handlerErrorMiddleware"
import authRouter from "./authRouter"
import petsRouter from "./petsRouter"

const router = Router()
router.use(authRouter)
router.use("/pets", petsRouter)
router.use(handleError)

export default router
