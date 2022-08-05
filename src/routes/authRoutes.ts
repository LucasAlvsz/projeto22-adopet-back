import { Router } from "express"

import { signIn, signUp } from "@/controllers/authController"
import { signUpchema, signInSchema } from "@/schemas/authSchema"
import validateSchema from "@/middlewares/validateSchemaMiddleware"

const authRouter = Router()

authRouter.get("/sign-up", validateSchema(signUpchema), signUp)
authRouter.get("/sign-in", validateSchema(signInSchema), signIn)

export default authRouter
