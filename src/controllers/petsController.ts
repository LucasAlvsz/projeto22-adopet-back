import { Request, Response } from "express";

import { petsService } from "@/services";
import {
  BreedFilter,
  BreedPayloadData,
  PetTypePayloadData,
} from "@/types/petTypes";

const createPet = async (req: Request, res: Response) => {
  const petData = req.body;
  const petPictures = req.files as Express.Multer.File[];
  const { id: userId } = res.locals.userData;
  const pet = await petsService.createPet(petData, petPictures, userId);
  res.status(201).send(pet);
};

const getPets = async (req: Request, res: Response) => {
  const filter: any = req.query || false;
  const { id: userId, addressId } = res.locals.userData;
  const pets = await petsService.getPets(filter, userId, addressId);

  res.status(200).send(pets);
};

const getPetProfileById = async (req: Request, res: Response) => {
  const petId = Number(req.params.id);
  const pet = await petsService.getProfileById(petId);
  res.status(200).send(pet);
};

const addNotInterestedPet = async (req: Request, res: Response) => {
  const petId = Number(req.params.id);
  const { id: userId } = res.locals.userData;
  await petsService.addNotInterestedPet(petId, userId);
  res.sendStatus(200);
};

const addInterestedPet = async (req: Request, res: Response) => {
  const petId = Number(req.params.id);
  const { id: userId } = res.locals.userData;
  await petsService.addInterestedPet(petId, userId);
  res.sendStatus(200);
};

const getInterestedPets = async (req: Request, res: Response) => {
  const filter: any = req.query || false;
  const { id: userId, addressId } = res.locals.userData;
  const pets = await petsService.getInterestedPets(filter, userId, addressId);
  res.status(200).send(pets);
};

const createBreed = async (req: Request, res: Response) => {
  const breedData = req.body as BreedPayloadData;
  const breed = await petsService.createBreed(breedData);
  res.status(201).send(breed);
};

const getAllBreeds = async (req: Request, res: Response) => {
  const filterQuery = req.query as BreedFilter;
  const breeds = await petsService.getAllBreeds(filterQuery);
  res.status(200).send(breeds);
};

const createPetType = async (req: Request, res: Response) => {
  const petType = req.body as PetTypePayloadData;
  const petTypeCreated = await petsService.createPetType(petType);
  res.status(201).send(petTypeCreated);
};

const getAllPetTypes = async (req: Request, res: Response) => {
  const petTypes = await petsService.getAllPetTypes();
  res.status(200).send(petTypes);
};

export default {
  createPet,
  getPets,
  getPetProfileById,
  addNotInterestedPet,
  addInterestedPet,
  getInterestedPets,
  createBreed,
  getAllBreeds,
  createPetType,
  getAllPetTypes,
};
