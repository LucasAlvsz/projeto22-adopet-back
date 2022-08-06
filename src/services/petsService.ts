import { conflictError, notFoundError, unprocessableEntityError } from "@/errors"
import queryFactory from "@/factories/queryFactory"
import petsRepository from "@/respositories/petsRepository"

const getPets = async (filter: string, userId: number) => {
	if (filter !== "dog" && filter !== "cat" && filter !== "")
		throw unprocessableEntityError(`Invalid filter "${filter}"`)

	return await petsRepository.findAll(filter as Filter, userId)
}

const addNotInterestedPet = async (petId: number, userId: number) => {
	const pet = await queryFactory.getById(petId, "Pet")
	if (!pet) throw notFoundError("pet not found")
	const notInterestedPet = await queryFactory.getById(petId, "NotInterestedPet")
	if (notInterestedPet) throw conflictError("pet already marked as not interested")
	await petsRepository.addNotInterestedPet(petId, userId)
}

export default {
	getPets,
	addNotInterestedPet,
}
