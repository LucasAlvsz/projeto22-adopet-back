import { Router } from "express"

import handleError from "@/middlewares/handlerErrorMiddleware"
import authRouter from "./authRoutes"

const router = Router()
router.use(authRouter)
router.use(handleError)

export default router
