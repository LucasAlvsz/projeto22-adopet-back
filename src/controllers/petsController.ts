import { Request, Response } from "express";
import { Multer } from "multer";

import { petsService } from "@/services";

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

const createPet = async (req: Request, res: Response) => {
  const petData = req.body;
  const petPictures = req.files as Express.Multer.File[];
  const { id: userId } = res.locals.userData;
  const pet = await petsService.createPet(petData, petPictures, userId);
  res.status(201).send(pet);
};

export default {
  getPets,
  getPetProfileById,
  addNotInterestedPet,
  addInterestedPet,
  getInterestedPets,
  createPet,
};
