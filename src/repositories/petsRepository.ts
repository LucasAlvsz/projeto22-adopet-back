import prisma from "@/config/database";
import {
  EnrichedFilter,
  BreedPayloadData,
  PetData,
  BreedFilter,
  PetTypePayloadData,
} from "@/types/petTypes";

const create = async (pet: PetData, userId: string) => {
  return await prisma.pet.create({
    data: {
      ...pet,
      ownerId: userId,
      breedId: pet.breedId,
    },
  });
};

const findAll = async (filter: EnrichedFilter, userId: string) => {
  const filterConfig = buildFindPetFilter(filter, userId);

  return prisma.pet.findMany({
    where: {
      ...filterConfig,

      interestedPets: {
        every: { userId: { not: userId } },
      },

      notInterestedPets: {
        every: { userId: { not: userId } },
      },
    },
    select: {
      id: true,
      name: true,
      type: true,
      age: true,
      weight: true,
      vaccinated: true,
      about: true,
      breed: { select: { name: true } },
      ownerUser: {
        select: {
          name: true,
          address: {
            select: {
              city: true,
              state: true,
              district: true,
            },
          },
        },
      },
      petPictures: { select: { picture: { select: { url: true } } } },
    },
  });
};

const getById = (petId: number) => {
  return prisma.pet.findUnique({
    where: {
      id: petId,
    },
    select: {
      id: true,
      name: true,
      age: true,
      sex: true,
      weight: true,
      vaccinated: true,
      about: true,
      breed: { select: { name: true } },
      ownerUser: {
        select: {
          id: true,
          name: true,
          picUrl: true,
          phone: true,

          address: {
            select: {
              city: true,
              state: true,
              district: true,
            },
          },
        },
      },
      petPictures: { select: { picture: { select: { url: true } } } },
    },
  });
};

const addNotInterestedPet = async (petId: number, userId: string) => {
  return prisma.notInterestedPet.create({ data: { petId, userId } });
};

const addInterestedPet = async (petId: number, userId: string) => {
  return prisma.interestedPet.create({ data: { petId, userId } });
};

const getNotInterestedPetByUserId = async (petId: number, userId: string) => {
  return prisma.notInterestedPet.findFirst({ where: { petId, userId } });
};

const getInterestedPetByUserId = async (petId: number, userId: string) => {
  return prisma.interestedPet.findFirst({ where: { petId, userId } });
};

const buildFindPetFilter = (filter: EnrichedFilter, userId = null) => {
  return {
    ...(filter.vaccinated && { vaccinated: Boolean(filter.vaccinated) }),
    ...(filter.location && {
      ownerUser: { address: { state: { equals: filter.location } } },
    }),
    type: { name: { equals: filter.type } },
  };
};

const getAllInterestedPets = async (filter: EnrichedFilter, userId: string) => {
  const filterConfig = buildFindPetFilter(filter, userId);
  return prisma.interestedPet.findMany({
    where: {
      userId,
      pet: filterConfig,
    },
    select: {
      pet: {
        select: {
          id: true,
          name: true,
          type: true,
          vaccinated: true,
          petPictures: {
            select: {
              picture: {
                select: { url: true },
              },
            },
          },
          ownerUser: {
            select: {
              address: {
                select: {
                  state: true,
                  city: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const createBreed = async (petBreed: BreedPayloadData) => {
  return await prisma.breed.create({
    data: {
      name: petBreed.name,
      type: {
        connect: {
          name: petBreed.name,
        },
      },
    },
  });
};

const getAllBreeds = async (filter: BreedFilter = null) => {
  const filterConfig = {
    ...(filter && { type: { name: filter.type.name } }),
    ...(filter && { type: { name: filter.type.name } }),
  };
  return await prisma.breed.findMany({
    where: filterConfig,
    select: {
      id: true,
      name: true,
    },
  });
};

const findBreedByName = async (name: string) => {
  return await prisma.breed.findUnique({
    where: {
      name,
    },
  });
};

const createPetType = async (petType: PetTypePayloadData) => {
  return await prisma.petType.create({
    data: petType,
  });
};

const getAllPetTypes = async () => {
  return prisma.petType.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

const findPetTypeByName = async (name: string) => {
  return await prisma.petType.findUnique({
    where: {
      name,
    },
  });
};

export default {
  create,
  findAll,
  getById,
  addNotInterestedPet,
  addInterestedPet,
  getNotInterestedPetByUserId,
  getInterestedPetByUserId,
  getAllInterestedPets,
  createBreed,
  getAllBreeds,
  findBreedByName,
  createPetType,
  getAllPetTypes,
  findPetTypeByName,
};
