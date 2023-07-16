import { addressService } from "@/services"
import { userRepository } from "@/repositories"
import { cryptographyUtils, JWTUtils } from "@/utils"
import { SignUpData, UserData } from "@/types/userTypes"
import { ConflictError, NotFoundError, UnauthorizedError } from "@/errors"

const create = async (userData: SignUpData) => {
	const user = await userRepository.getByEmail(userData.email)
	if (user) throw new ConflictError("Email already registered")

	const { addressId } = await addressService.create(userData.cep)
	delete userData.cep

	const hashedPassword = cryptographyUtils.hashWithSalt(userData.password)

	await userRepository.create({
		...userData,
		password: hashedPassword,
		addressId,
	})
}

const login = async (loginData: UserData) => {
	const user = await userRepository.getByEmail(loginData.email)
	if (!user) throw new NotFoundError("Invalid email")
	if (!cryptographyUtils.compare(loginData.password, user.password))
		throw new UnauthorizedError("Invalid password")

	const { id, addressId } = user
	return { token: JWTUtils.generateToken({ id, addressId }) }
}

export default { create, login }
