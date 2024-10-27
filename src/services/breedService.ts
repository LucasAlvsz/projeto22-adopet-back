import { Breed } from "@prisma/client";
import { queryFactory } from "@/factories";
import { breedsRepository } from "@/repositories";
import { BreedPayloadData, BreedData } from "@/types/breedTypes";
import { ConflictError } from "@/errors";

const createBreed = async (breedData: BreedPayloadData): Promise<Breed> => {
  await validateBreedName(breedData.name);
  return await breedsRepository.create({
    ...breedData,
    name: formatBreedName(breedData.name),
  });
};

const formatBreedName = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-\s]/g, "")
    .replace(/\s/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const validateBreedName = async (name: string) => {
  const breed = await breedsRepository.findByName(name);
  if (breed) throw new ConflictError("breed already exists");
};

const getAllBreeds = async (): Promise<BreedData[]> => {
  return await breedsRepository.getAll();
};

const getBreedById = async (breedId: number): Promise<Breed> => {
  return await queryFactory.getById(breedId, "Breed");
};

export default {
  createBreed,
  getAllBreeds,
  getBreedById,
};
