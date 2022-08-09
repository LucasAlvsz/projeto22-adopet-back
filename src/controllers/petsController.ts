import { Request, Response } from "express"

import petService from "@/services/petsService"

const getPets = async (req: Request, res: Response) => {
	const query = req.query.filter || ""
	const { id: userId } = res.locals.userData
	const pets = await petService.getPets(query as string, userId)
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

export { getPets, addNotInterestedPet, getPetProfileById }
