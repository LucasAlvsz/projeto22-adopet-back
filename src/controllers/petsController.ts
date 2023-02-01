import { Request, Response } from "express"

import { petsService } from "@/services"

const getPets = async (req: Request, res: Response) => {
	const filter: any = req.query || false
	const { id: userId, adressId } = res.locals.userData
	const pets = await petsService.getPets(filter, userId, adressId)
	res.send(pets)
}

const getPetProfileById = async (req: Request, res: Response) => {
	const petId = Number(req.params.id)
	const pet = await petsService.getProfileById(petId)
	res.send(pet)
}

const addNotInterestedPet = async (req: Request, res: Response) => {
	const petId = Number(req.params.id)
	const { id: userId } = res.locals.userData
	await petsService.addNotInterestedPet(petId, userId)
	res.sendStatus(200)
}

const addInterestedPet = async (req: Request, res: Response) => {
	const petId = Number(req.params.id)
	const { id: userId } = res.locals.userData
	await petsService.addInterestedPet(petId, userId)
	res.sendStatus(200)
}

const getInterestedPets = async (req: Request, res: Response) => {
	const filter: any = req.query || false
	const { id: userId, adressId } = res.locals.userData
	const pets = await petsService.getInterestedPets(filter, userId, adressId)
	res.send(pets)
}

export default {
	getPets,
	getPetProfileById,
	addNotInterestedPet,
	addInterestedPet,
	getInterestedPets,
}
