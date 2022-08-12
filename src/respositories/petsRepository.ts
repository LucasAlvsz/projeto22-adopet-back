import prisma from "@/db"
import { Filter } from "@/types/petTypes"

const findAll = async (filter: Filter, userId: number) => {
	return prisma.pet.findMany({
		where: {
			...(filter.type && { type: filter.type }),
			...(filter.location && {
				ownerUser: { adress: { city: { state: { name: { equals: filter.location } } } } },
			}),
			...(filter.vaccinated && { vaccinated: filter.vaccinated }),

			notInterestedPets: {
				every: { userId: { not: userId } },
			},
			InterestedPet: {
				every: { userId: { not: userId } },
			},
		},
		select: {
			id: true,
			name: true,
			age: true,
			weight: true,
			vaccinated: true,
			about: true,
			breed: { select: { name: true } },
			ownerUser: {
				select: {
					name: true,
					adress: {
						select: {
							city: { select: { name: true } },
							state: { select: { name: true } },
							district: { select: { name: true } },
						},
					},
				},
			},
			petPictures: { select: { picture: { select: { url: true } } } },
		},
	})
}

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
					name: true,
					picUrl: true,

					adress: {
						select: {
							city: { select: { name: true } },
							state: { select: { name: true } },
							district: { select: { name: true } },
						},
					},
				},
			},
			petPictures: { select: { picture: { select: { url: true } } } },
		},
	})
}

const addNotInterestedPet = async (petId: number, userId: number) =>
	prisma.notInterestedPet.create({ data: { petId, userId } })

const addInterestedPet = async (petId: number, userId: number) =>
	prisma.interestedPet.create({ data: { petId, userId } })

const getNotInterestedPetByUserId = async (petId: number, userId: number) => {
	return prisma.notInterestedPet.findFirst({ where: { petId, userId } })
}

const getInterestedPetByUserId = async (petId: number, userId: number) => {
	return prisma.interestedPet.findFirst({ where: { petId, userId } })
}

const getAllInterestedPets = async (userId: number) => {
	return prisma.interestedPet.findMany({ where: { userId } })
}

export default {
	findAll,
	getById,
	addNotInterestedPet,
	addInterestedPet,
	getNotInterestedPetByUserId,
	getInterestedPetByUserId,
	getAllInterestedPets,
}
