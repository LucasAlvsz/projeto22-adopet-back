import { addressRepository, userRepository } from "../../src/repositories"
import { authService } from "../../src/services"
import { cryptographyUtils } from "../../src/utils"

import { userData } from "./factories/authServiceFactory"

beforeEach(() => {
	jest.clearAllMocks()
})

describe("Authentication Service", () => {
	describe("Create a new user", () => {
		it("Should create a new user", async () => {
			jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce(null)
			jest.spyOn(global, "fetch").mockResolvedValueOnce({
				json: () => ({ erro: false }),
			} as any)
			jest.spyOn(addressRepository, "create").mockResolvedValueOnce(
				1 as any
			)
			jest.spyOn(userRepository, "create").mockResolvedValueOnce(null)

			await authService.create(userData() as any)
			expect(userRepository.getByEmail).toBeCalledTimes(1)
			expect(addressRepository.create).toBeCalledTimes(1)
			expect(userRepository.create).toBeCalledTimes(1)
		})
		it("Should throw an error if the email is already registered", async () => {
			jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce(
				{} as any
			)
			jest.spyOn(addressRepository, "create").mockResolvedValueOnce(
				1 as any
			)
			await expect(
				authService.create(userData() as any)
			).rejects.toHaveProperty("code", 409)
			expect(userRepository.getByEmail).toBeCalledTimes(1)
			expect(addressRepository.create).toBeCalledTimes(0)
			expect(userRepository.create).toBeCalledTimes(0)
		})
		it("Should throw an error if the CEP is invalid", async () => {
			jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce(null)

			jest.spyOn(global, "fetch").mockResolvedValueOnce({
				status: 404,
			} as any)

			await expect(
				authService.create(userData() as any)
			).rejects.toHaveProperty("code", 404)
			expect(userRepository.getByEmail).toBeCalledTimes(1)
			expect(fetch).toBeCalledTimes(1)
			expect(addressRepository.create).toBeCalledTimes(0)
			expect(userRepository.create).toBeCalledTimes(0)
		})
	})
	describe("Login", () => {
		it("Should login", async () => {
			jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce({
				password: cryptographyUtils.hashWithSalt("12345689"),
			} as any)

			await expect(
				authService.login(userData(false, "12345689") as any)
			).resolves.toHaveProperty("token")
			expect(userRepository.getByEmail).toBeCalledTimes(1)
		})
		it("Should throw an error if the email is invalid", async () => {
			jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce(null)
			await expect(
				authService.login(userData() as any)
			).rejects.toHaveProperty("code", 404)
			expect(userRepository.getByEmail).toBeCalledTimes(1)
		})
		it("Should throw an error if the password is invalid", async () => {
			jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce({
				password: "12345678",
			} as any)
			await expect(
				authService.login(userData() as any)
			).rejects.toHaveProperty("code", 401)
			expect(userRepository.getByEmail).toBeCalledTimes(1)
		})
	})
})
