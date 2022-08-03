import { generateToken } from "@/utils/JWTUtils"
import { SignUpData, UserData } from "@/types/userTypes"
import userRepository from "@/respositories/userRepository"
import { conflictError, notFoundError, unauthorizedError } from "@/errors"
import { decryptAndcompare, encryptWithSalt } from "@/utils/cryptographyUtils"

const create = async (userData: SignUpData) => {
	const user = await userRepository.getByEmail(userData.email)
	if (user) throw conflictError("Email already registered")
	userData = { ...userData, password: encryptWithSalt(userData.password) }
	await userRepository.create(userData)
}

const login = async (loginData: UserData) => {
	const user = await userRepository.getByEmail(loginData.email)
	if (!user) throw notFoundError("Invalid email")
	if (!decryptAndcompare(loginData.password, user.password))
		throw unauthorizedError("Invalid password")

	const { id } = user
	return { token: generateToken({ id }) }
}

export default { create, login }
