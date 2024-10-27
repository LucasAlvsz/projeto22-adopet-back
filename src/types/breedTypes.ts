import { Breed } from "@prisma/client";

type BreedData = Omit<Breed, "createdAt">;

type BreedPayloadData = Omit<BreedData, "id">;

export { BreedData, BreedPayloadData };
