import { Pet, PetType } from "@prisma/client";
import { Breed } from "@prisma/client";

type PetData = Omit<Pet, "id" | "createdAt">;

type PetPayloadData = Omit<PetData, "ownerId">;

type Filter = {
  location?: boolean;
  vaccinated?: boolean;
  type?: PetTypeData["name"];
};

type EnrichedFilter = Omit<Filter, "location"> & {
  location?: string;
};

type PetTypeData = Omit<PetType, "createdAt">;

type PetTypePayloadData = Omit<PetTypeData, "id">;

type BreedData = Omit<Breed, "createdAt" | "petTypeId">;

type BreedPayloadData = Omit<Breed, "id" | "petTypeId" | "createdAt"> & {
  type: PetTypeData["name"];
};

type BreedFilter = Omit<Filter, "location" | "vaccinated"> & {
  type?: {
    id?: PetTypeData["id"];
    name?: PetTypeData["name"];
  };
};

export {
  PetData,
  PetPayloadData,
  Filter,
  EnrichedFilter,
  PetTypeData,
  PetTypePayloadData,
  BreedData,
  BreedPayloadData,
  BreedFilter,
};
