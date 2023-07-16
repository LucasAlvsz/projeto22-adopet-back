import { Pet } from "@prisma/client"

type Filter = {
	location?: string
	type?: "dog" | "cat"
	vaccinated?: boolean
}

type PetData = Omit<Pet, "id" | "ownerId" | "breedId" | "createdAt">

export { Filter, PetData }
