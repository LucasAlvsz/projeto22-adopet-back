import { Picture } from "@prisma/client";
import prisma from "@/config/database";

const create = async (pictureData: Picture) => {
  return await prisma.picture.create({ data: { ...pictureData } });
};

const createMany = async (picturesData: { url: string }[]) => {
  return await prisma.picture.createManyAndReturn({ data: picturesData });
};

export default { create, createMany };
