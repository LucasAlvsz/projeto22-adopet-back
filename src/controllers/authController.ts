import { Request, Response } from "express"

import { authService } from "@/services"
import { SignUpData, UserData } from "@/types/userTypes"

const signUp = async (req: Request, res: Response) => {
	const userData: SignUpData = req.body
	await authService.create(userData)
	res.sendStatus(201)
}

const signIn = async (req: Request, res: Response) => {
	const loginData: UserData = req.body
	const token = await authService.login(loginData)
	res.send(token)
}

export default { signUp, signIn }
