import { ConflictError, NotFoundError } from "@/errors"
import { queryFactory } from "@/factories"
import { adressRepository, petsRepository } from "@/respositories"
import { Filter } from "@/types/petTypes"

const getPets = async (filter: Filter, userId: number, adressId: number) => {
	if (filter.location) {
		const { state } = await adressRepository.getById(adressId)
		filter.location = state.name
	}
	if (filter.vaccinated) filter.vaccinated = true

	return petsRepository.findAll(filter, userId)
}

const getProfileById = async (petId: number) => {
	const pet = await queryFactory.getById(petId, "Pet")
	if (!pet) throw new NotFoundError("pet not found")

	return petsRepository.getById(petId)
}

const addNotInterestedPet = async (petId: number, userId: number) => {
	const pet = await queryFactory.getById(petId, "Pet")
	if (!pet) throw new NotFoundError("pet not found")
	const notInterestedPet = await petsRepository.getNotInterestedPetByUserId(
		petId,
		userId
	)
	if (notInterestedPet)
		throw new ConflictError("pet already marked as not interested")
	const interestedPet = await petsRepository.getInterestedPetByUserId(
		petId,
		userId
	)
	if (interestedPet)
		throw new ConflictError("pet already marked as interested")

	await petsRepository.addNotInterestedPet(petId, userId)
}

const addInterestedPet = async (petId: number, userId: number) => {
	const pet = await queryFactory.getById(petId, "Pet")
	if (!pet) throw new NotFoundError("pet not found")
	const notInterestedPet = await petsRepository.getNotInterestedPetByUserId(
		petId,
		userId
	)
	if (notInterestedPet)
		throw new ConflictError("pet already marked as not interested")
	const interestedPet = await petsRepository.getInterestedPetByUserId(
		petId,
		userId
	)
	if (interestedPet)
		throw new ConflictError("pet already marked as interested")

	await petsRepository.addInterestedPet(petId, userId)
}

const getInterestedPets = async (
	filter: Filter,
	userId: number,
	adressId: number
) => {
	if (filter.location) {
		const { state } = await adressRepository.getById(adressId)
		filter.location = state.name
	}
	if (filter.vaccinated) filter.vaccinated = true
	return petsRepository.getAllInterestedPets(filter, userId)
}

export default {
	getPets,
	getProfileById,
	addNotInterestedPet,
	addInterestedPet,
	getInterestedPets,
}
