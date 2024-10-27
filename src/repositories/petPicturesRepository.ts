import { PetPictures } from "@prisma/client";
import prisma from "@/config/database";

const create = async (petPicturesData: Omit<PetPictures, "id | createdAt">) => {
  return await prisma.petPictures.create({ data: { ...petPicturesData } });
};

const createMany = async (
  petPicturesData: { petId: number; pictureId: number }[]
) => {
  return await prisma.petPictures.createManyAndReturn({
    data: petPicturesData,
  });
};

export default { create, createMany };
