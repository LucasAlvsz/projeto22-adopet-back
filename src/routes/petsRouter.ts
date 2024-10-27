import { Router } from "express";

import { petsController } from "@/controllers";
import { validateBearerToken, validateSchema } from "@/middlewares";
import { petsSchema } from "@/schemas";
import handleUploadFilesMiddleware from "@/middlewares/handleUploadFilesMiddleware";

const petsRouter = Router();

petsRouter
  .use(validateBearerToken)
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
    "/create",
    handleUploadFilesMiddleware.uploadMultipleFiles(),
    validateSchema(petsSchema.petSchema),
    petsController.createPet
  );

export default petsRouter;
