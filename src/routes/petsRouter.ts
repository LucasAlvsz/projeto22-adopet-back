import { Router } from "express";

import { petsController } from "@/controllers";
import { validateBearerToken, validateSchema } from "@/middlewares";
import { petsSchema } from "@/schemas";
import handleUploadFilesMiddleware from "@/middlewares/handleUploadFilesMiddleware";

const petsRouter = Router();

petsRouter
  .use(validateBearerToken)
  .post(
    "/create",
    handleUploadFilesMiddleware.uploadMultipleFiles(),
    validateSchema(petsSchema.petSchema),
    petsController.createPet
  )
  .get("", validateSchema(petsSchema.filterQuerySchema), petsController.getPets)
  .get("/profile/:id", petsController.getPetProfileById)
  .post("/:id/not-interested", petsController.addNotInterestedPet)
  .post("/:id/interested", petsController.addInterestedPet)
  .get(
    "/interested",
    validateSchema(petsSchema.filterQuerySchema),
    petsController.getInterestedPets
  )
  .post(
    "/breeds",
    validateSchema(petsSchema.breedSchema),
    petsController.createBreed
  )
  .get(
    "/breeds",
    validateSchema(petsSchema.breedQuerySchema),
    petsController.getAllBreeds
  )
  .post(
    "/types",
    validateSchema(petsSchema.petTypeSchema),
    petsController.createPetType
  )
  .get("/types", petsController.getAllPetTypes);

export default petsRouter;
