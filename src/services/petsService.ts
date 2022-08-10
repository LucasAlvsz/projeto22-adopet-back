import { conflictError, notFoundError, unprocessableEntityError } from "@/errors"
import queryFactory from "@/factories/queryFactory"
import adressRepository from "@/respositories/adressRepository"
import petsRepository from "@/respositories/petsRepository"
import { Filter } from "@/types/petTypes"

const getPets = async (filter: Filter, userId: number, adressId: number) => {
	if (filter.location) {
		const { state } = await adressRepository.getById(adressId)
		filter.location = state.name
	}
	return await petsRepository.findAll(filter, userId)
}

const getProfileById = async (petId: number) => {
	const pet = await queryFactory.getById(petId, "Pet")
	if (!pet) throw notFoundError("pet not found")
	return await petsRepository.getById(petId)
}

const addNotInterestedPet = async (petId: number, userId: number) => {
	const pet = await queryFactory.getById(petId, "Pet")
	if (!pet) throw notFoundError("pet not found")
	const notInterestedPet = await petsRepository.getNotInterestedPetByUserId(petId, userId)
	if (notInterestedPet) throw conflictError("pet already marked as not interested")
	await petsRepository.addNotInterestedPet(petId, userId)
}

export default {
	getPets,
	getProfileById,
	addNotInterestedPet,
}
