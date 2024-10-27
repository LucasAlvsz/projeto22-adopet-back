import prisma from "@/config/database";

import { Address } from "@/types/addressType";

const create = async (addressData: Address) => {
  return prisma.address.create({ data: { ...addressData } });
};

const getById = async (addressId: number) => {
  return prisma.address.findUnique({
    where: { id: addressId },
    select: {
      city: true,
      state: true,
      district: true,
    },
  });
};

export default { create, getById };
