import { Router } from "express";
import { breedsController } from "@/controllers";

const breedsRouter = Router();

breedsRouter
  .post("/", breedsController.createBreed)
  .get("/", breedsController.getAllBreeds);

export default breedsRouter;
