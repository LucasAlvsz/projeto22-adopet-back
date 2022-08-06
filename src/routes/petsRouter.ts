import { Router } from "express"

import { addNotInterestedPet, getPets } from "@/controllers/petsController"
import validateBearerToken from "@/middlewares/validateBearerTokenMiddleware"

const petsRouter = Router()

petsRouter.use(validateBearerToken)
petsRouter.get("", getPets)
petsRouter.post("/:id/not-interested", addNotInterestedPet)

export default petsRouter
