import { Router } from "express"
import "express-async-errors"

import authRouter from "./authRouter"
import petsRouter from "./petsRouter"
import { handleError } from "@/middlewares"

const router = Router()
router
	.get("/health", (_, res) => res.send({
		status: "OK",
		message: "Server is running"
	}))
	.use(authRouter)
	.use("/pets", petsRouter)
	.use(handleError)

export default router
