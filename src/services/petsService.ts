import { ConflictError, NotFoundError } from "@/errors";
import { queryFactory } from "@/factories";
import {
  addressRepository,
  petPicturesRepository,
  petsRepository,
  picturesRepository,
} from "@/repositories";
import { EnrichedFilter, Filter, PetData } from "@/types/petTypes";
import { filesService } from "@/services";

const getPets = async (filter: Filter, userId: number, addressId: number) => {
  const enrichedFilter = await applyLocationToFilter(filter, addressId);
  return petsRepository.findAll(enrichedFilter, userId);
};

const getProfileById = async (petId: number) => {
  const pet = await queryFactory.getById(petId, "Pet");
  if (!pet) throw new NotFoundError("pet not found");

  return petsRepository.getById(petId);
};

const addNotInterestedPet = async (petId: number, userId: number) => {
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

const addInterestedPet = async (petId: number, userId: number) => {
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
  userId: number,
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

const createPet = async (
  petData: PetData,
  petPictures: Express.Multer.File[],
  userId: number
) => {
  const formattedPetData = {
    ...petData,
    age: Number(petData.age),
    weight: Number(petData.weight),
    vaccinated: Boolean(petData.vaccinated),
    breedId: Number(petData.breedId),
  };
  const createdPet = await petsRepository.create(formattedPetData, userId);

  await filesService.uploadPublicTempFilesToS3(petPictures);

  const createdPictures = await picturesRepository.createMany(
    petPictures.map(({ filename }) => ({
      url: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/public/${filename}`,
    }))
  );

  await petPicturesRepository.createMany(
    createdPictures.map(({ id: pictureId }) => ({
      petId: createdPet.id,
      pictureId: pictureId,
    }))
  );

  return createdPet;
};

export default {
  getPets,
  getProfileById,
  addNotInterestedPet,
  addInterestedPet,
  getInterestedPets,
  createPet,
};
