import prisma from "@/config/database";
import { Prisma } from "@prisma/client";

const getById = async (id: number, model: Prisma.ModelName) => {
  return await prisma[model].findUnique({
    where: { id },
  });
};

export default { getById };
