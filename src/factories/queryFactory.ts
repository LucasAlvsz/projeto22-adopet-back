import prisma from "@/config/database";
import { Prisma } from "@prisma/client";

const getById = async (id: number, model: Prisma.ModelName) => {
  return await prisma[model].findUnique({
    where: { id },
  });
};

const getByUnique = async (unique: string, model: Prisma.ModelName) => {
  return await prisma[model].findUnique({
    where: { unique },
  });
};

export default { getById, getByUnique };
