import { Router } from "express"

import { addNotInterestedPet, getPetProfileById, getPets } from "@/controllers/petsController"
import validateBearerToken from "@/middlewares/validateBearerTokenMiddleware"

import { filterQuerySchema } from "@/schemas/petsSchema"
import validateSchema from "@/middlewares/validateSchemaMiddleware"

const petsRouter = Router()

petsRouter.use(validateBearerToken)
petsRouter.get("", validateSchema(filterQuerySchema), getPets)
petsRouter.get("/profile/:id", getPetProfileById)
petsRouter.post("/:id/not-interested", addNotInterestedPet)
export default petsRouter
