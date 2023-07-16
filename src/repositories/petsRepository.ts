import prisma from "@/db"
import { Filter } from "@/types/petTypes"

const findAll = async (filter: Filter, userId: number) => {
	return prisma.pet.findMany({
		where: {
			...(filter.type && { type: filter.type }),
			...(filter.location && {
				ownerUser: {
					address: {
						state: { equals: filter.location },
					},
				},
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

const getAllInterestedPets = async (filter: Filter, userId: number) => {
	return prisma.interestedPet.findMany({
		where: {
			userId,
			pet: {
				...(filter.type && { type: filter.type }),
				...(filter.location && {
					ownerUser: {
						address: {
							state: { equals: filter.location },
						},
					},
				}),
				...(filter.vaccinated && { vaccinated: filter.vaccinated }),
			},
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
	})
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
