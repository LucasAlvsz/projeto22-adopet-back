import { Router } from "express"

import { authController } from "@/controllers"
import { validateSchema } from "@/middlewares"
import { authSchema } from "@/schemas"

const authRouter = Router()

authRouter.post(
	"/sign-up",
	validateSchema(authSchema.signUpchema),
	authController.signUp
)
authRouter.post(
	"/sign-in",
	validateSchema(authSchema.signInSchema),
	authController.signIn
)

export default authRouter
