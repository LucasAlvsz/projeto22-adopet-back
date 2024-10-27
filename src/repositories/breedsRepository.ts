import { Breed, BreedPayload } from "@prisma/client";
import prisma from "@/config/database";
import { BreedData, BreedPayloadData } from "@/types/breedTypes";

const create = async (breedData: BreedPayloadData): Promise<Breed> => {
  return await prisma.breed.create({
    data: breedData,
  });
};

const getAll = async (): Promise<BreedData[]> => {
  return await prisma.breed.findMany({
    select: {
      id: true,
      name: true,
      type: true,
    },
  });
};

const findByName = async (name: string): Promise<Breed> => {
  return await prisma.breed.findUnique({
    where: {
      name,
    },
  });
};

export default {
  create,
  getAll,
  findByName,
};
