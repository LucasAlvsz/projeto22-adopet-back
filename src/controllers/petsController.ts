import { Request, Response } from "express"

import petService from "@/services/petsService"

const getPets = async (req: Request, res: Response) => {
	const filter: any = req.query || false
	const { id: userId, adressId } = res.locals.userData
	const pets = await petService.getPets(filter, userId, adressId)
	res.send(pets)
}

const getPetProfileById = async (req: Request, res: Response) => {
	const petId = Number(req.params.id)
	const pet = await petService.getProfileById(petId)
	res.send(pet)
}

const addNotInterestedPet = async (req: Request, res: Response) => {
	const petId = Number(req.params.id)
	const { id: userId } = res.locals.userData
	await petService.addNotInterestedPet(petId, userId)
	res.sendStatus(200)
}

const addInterestedPet = async (req: Request, res: Response) => {
	const petId = Number(req.params.id)
	const { id: userId } = res.locals.userData
	await petService.addInterestedPet(petId, userId)
	res.sendStatus(200)
}

const getInterestedPets = async (req: Request, res: Response) => {
	const petId = Number(req.params.id)
	const { id: userId } = res.locals.userData
	const pets = await petService.getInterestedPets(petId, userId)
	res.send(pets)
}

export { getPets, getPetProfileById, addNotInterestedPet, addInterestedPet, getInterestedPets }
