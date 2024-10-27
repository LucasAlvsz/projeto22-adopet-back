import { Pet } from "@prisma/client"

type PetData = Omit<Pet, "id" | "createdAt">

type PetPayloadData = Omit<PetData, "ownerId">

type Filter = {
	location?: boolean
	vaccinated?: boolean
	type?: "dog" | "cat"
}

type EnrichedFilter = Omit<Filter, "location"> & {
	location?: string
}

export { PetData, PetPayloadData, Filter, EnrichedFilter }
