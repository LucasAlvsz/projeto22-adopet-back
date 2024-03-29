import axios from "axios"

import { ConflictError, NotFoundError, UnauthorizedError } from "@/errors"
import { adressRepository, userRepository } from "@/respositories"
import { SignUpData, UserData } from "@/types/userTypes"
import { cryptographyUtils, JWTUtils } from "@/utils"

const create = async (userData: SignUpData) => {
	const user = await userRepository.getByEmail(userData.email)
	if (user) throw new ConflictError("Email already registered")
	const { uf, localidade, bairro } = await validateCep(userData.cep)

	const { id: adressId } = await adressRepository.create({
		cep: userData.cep,
		state: uf,
		city: localidade,
		district: bairro,
	})

	delete userData.cep
	userData = {
		...userData,
		password: cryptographyUtils.encryptWithSalt(userData.password),
		adressId,
	}

	await userRepository.create(userData)
}

const login = async (loginData: UserData) => {
	const user = await userRepository.getByEmail(loginData.email)
	if (!user) throw new NotFoundError("Invalid email")
	if (!cryptographyUtils.decryptAndcompare(loginData.password, user.password))
		throw new UnauthorizedError("Invalid password")

	const { id, adressId } = user
	return { token: JWTUtils.generateToken({ id, adressId }) }
}

const validateCep = async (cep: string) => {
	cep = cep.replace(/\D/g, "")
	const { data: adressData }: any = await axios.get(
		`https://viacep.com.br/ws/${cep}/json/`
	)
	if (adressData.erro) throw new NotFoundError("Invalid CEP")
	return adressData
}

export default { create, login }
