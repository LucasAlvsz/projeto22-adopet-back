import { Request, Response } from "express";
import { breedService } from "@/services";
import { BreedPayloadData } from "@/types/breedTypes";

const createBreed = async (req: Request, res: Response) => {
  const breedData = req.body as BreedPayloadData;
  const breed = await breedService.createBreed(breedData);
  res.status(201).send(breed);
};

const getAllBreeds = async (req: Request, res: Response) => {
  const breeds = await breedService.getAllBreeds();
  res.status(200).send(breeds);
};

export default {
  createBreed,
  getAllBreeds,
};
