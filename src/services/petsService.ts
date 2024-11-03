import { ConflictError, NotFoundError } from "@/errors";
import { queryFactory } from "@/factories";
import {
  addressRepository,
  petPicturesRepository,
  petsRepository,
  picturesRepository,
} from "@/repositories";
import {
  EnrichedFilter,
  Filter,
  BreedData,
  PetData,
  PetTypePayloadData,
  BreedPayloadData,
  BreedFilter,
} from "@/types/petTypes";
import { filesService } from "@/services";
import { Breed } from "@prisma/client";

const createPet = async (
  petData: PetData,
  petPictures: Express.Multer.File[],
  userId: string
) => {
  const formattedPetData = {
    name: petData.name,
    sex: petData.sex,
    about: petData.about,
    age: Number(petData.age),
    weight: Number(petData.weight),
    vaccinated: Boolean(petData.vaccinated),
    breedId: Number(petData.breedId),
    petTypeId: Number(petData.petTypeId),
  } as PetData;

  const breedExists = await queryFactory.getById(
    formattedPetData.breedId,
    "Breed"
  );
  if (!breedExists) throw new NotFoundError("breed not found");

  const petTypeExists = await queryFactory.getById(
    formattedPetData.petTypeId,
    "PetType"
  );
  if (!petTypeExists) throw new NotFoundError("pet type not found");

  const createdPet = await petsRepository.create(formattedPetData, userId);

  await filesService.uploadPublicTempFilesToS3(petPictures);

  const createdPictures = await picturesRepository.createMany(
    petPictures.map(({ filename }) => ({
      url: `${process.env.PUBLIC_IMAGES_URL}/${filename}`,
    }))
  );

  await petPicturesRepository.createMany(
    createdPictures.map(({ id: pictureId }) => ({
      petId: createdPet.id,
      pictureId: pictureId,
    }))
  );

  return { pet: createdPet };
};

const getPets = async (filter: Filter, userId: string, addressId: number) => {
  const enrichedFilter = await applyLocationToFilter(filter, addressId);
  return petsRepository.findAll(enrichedFilter, userId);
};

const getProfileById = async (petId: number) => {
  const pet = await queryFactory.getById(petId, "Pet");
  if (!pet) throw new NotFoundError("pet not found");

  return petsRepository.getById(petId);
};

const addNotInterestedPet = async (petId: number, userId: string) => {
  const pet = await queryFactory.getById(petId, "Pet");
  if (!pet) throw new NotFoundError("pet not found");
  const notInterestedPet = await petsRepository.getNotInterestedPetByUserId(
    petId,
    userId
  );
  if (notInterestedPet)
    throw new ConflictError("pet already marked as not interested");
  const interestedPet = await petsRepository.getInterestedPetByUserId(
    petId,
    userId
  );
  if (interestedPet)
    throw new ConflictError("pet already marked as interested");

  await petsRepository.addNotInterestedPet(petId, userId);
};

const addInterestedPet = async (petId: number, userId: string) => {
  const pet = await queryFactory.getById(petId, "Pet");
  if (!pet) throw new NotFoundError("pet not found");
  const notInterestedPet = await petsRepository.getNotInterestedPetByUserId(
    petId,
    userId
  );
  if (notInterestedPet)
    throw new ConflictError("pet already marked as not interested");
  const interestedPet = await petsRepository.getInterestedPetByUserId(
    petId,
    userId
  );
  if (interestedPet)
    throw new ConflictError("pet already marked as interested");

  await petsRepository.addInterestedPet(petId, userId);
};

const getInterestedPets = async (
  filter: Filter,
  userId: string,
  addressId: number
) => {
  const enrichedFilter = await applyLocationToFilter(filter, addressId);
  return petsRepository.getAllInterestedPets(enrichedFilter, userId);
};

const applyLocationToFilter = async (
  filter: Filter,
  addressId: number
): Promise<EnrichedFilter> => {
  const enrichedFilter: EnrichedFilter = { ...filter, location: null };
  if (filter.location) {
    const address = await addressRepository.getById(addressId);
    if (!address) throw new NotFoundError("address not found");
    enrichedFilter.location = address.state;
  }
  return enrichedFilter;
};

const createBreed = async (breedData: BreedPayloadData): Promise<Breed> => {
  const breedExists = await petsRepository.findBreedByName(breedData.name);
  if (breedExists) throw new ConflictError("breed already exists");

  const petType = await petsRepository.findPetTypeByName(breedData.type);
  if (!petType) throw new NotFoundError("pet type not found");

  return await petsRepository.createBreed({
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

const getAllBreeds = async (
  filter: BreedFilter = null
): Promise<BreedData[]> => {
  return await petsRepository.getAllBreeds(filter);
};

const getBreedById = async (breedId: number): Promise<Breed> => {
  return await queryFactory.getById(breedId, "Breed");
};

const createPetType = async (petType: PetTypePayloadData) => {
  const petTypeExists = await petsRepository.findPetTypeByName(petType.name);
  if (petTypeExists) throw new ConflictError("pet type already exists");

  return await petsRepository.createPetType(petType);
};

const getAllPetTypes = async () => {
  return petsRepository.getAllPetTypes();
};

export default {
  createPet,
  getPets,
  getProfileById,
  addNotInterestedPet,
  addInterestedPet,
  getInterestedPets,
  createPetType,
  getAllPetTypes,
  getAllBreeds,
  getBreedById,
  createBreed,
};
