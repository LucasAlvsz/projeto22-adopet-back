import prisma from "@/db"

const findAll = async (filter: Filter, userId: number) => {
	return prisma.pet.findMany({
		where: {
			...(filter && { type: filter }),
			notInterestedPets: {
				every: { userId: { not: userId } },
			},
		},
	})
}

const addNotInterestedPet = async (petId: number, userId: number) =>
	prisma.notInterestedPet.create({ data: { petId, userId } })

export default {
	findAll,
	addNotInterestedPet,
}
