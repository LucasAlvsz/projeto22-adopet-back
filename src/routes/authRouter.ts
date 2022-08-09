import { Router } from "express"

import { signIn, signUp } from "@/controllers/authController"
import { signUpchema, signInSchema } from "@/schemas/authSchema"
import validateSchema from "@/middlewares/validateSchemaMiddleware"

const authRouter = Router()

authRouter.post("/sign-up", validateSchema(signUpchema), signUp)
authRouter.post("/sign-in", validateSchema(signInSchema), signIn)

export default authRouter
