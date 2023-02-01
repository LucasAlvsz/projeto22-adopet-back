import axios from "axios"
import { adressRepository, userRepository } from "../../src/respositories"
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
			jest.spyOn(axios, "get").mockResolvedValueOnce({
				data: { erro: false },
			} as any)
			jest.spyOn(adressRepository, "create").mockResolvedValueOnce(
				1 as any
			)
			jest.spyOn(userRepository, "create").mockResolvedValueOnce(null)

			await authService.create(userData() as any)
			expect(userRepository.getByEmail).toBeCalledTimes(1)
			expect(adressRepository.create).toBeCalledTimes(1)
			expect(userRepository.create).toBeCalledTimes(1)
		})
		it("Should throw an error if the email is already registered", async () => {
			jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce(
				{} as any
			)
			await expect(
				authService.create(userData() as any)
			).rejects.toHaveProperty("status", 409)
			expect(userRepository.getByEmail).toBeCalledTimes(1)
			expect(adressRepository.create).toBeCalledTimes(0)
			expect(userRepository.create).toBeCalledTimes(0)
		})
		it("Should throw an error if the CEP is invalid", async () => {
			jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce(null)
			jest.spyOn(axios, "get").mockResolvedValueOnce({
				data: { erro: "true" },
			} as any)

			await expect(
				authService.create(userData() as any)
			).rejects.toHaveProperty("status", 404)
			expect(userRepository.getByEmail).toBeCalledTimes(1)
			expect(axios.get).toBeCalledTimes(1)
			expect(adressRepository.create).toBeCalledTimes(0)
			expect(userRepository.create).toBeCalledTimes(0)
		})
	})
	describe("Login", () => {
		it("Should login", async () => {
			jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce({
				password: cryptographyUtils.encryptWithSalt("12345689"),
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
			).rejects.toHaveProperty("status", 404)
			expect(userRepository.getByEmail).toBeCalledTimes(1)
		})
		it("Should throw an error if the password is invalid", async () => {
			jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce({
				password: "12345678",
			} as any)
			await expect(
				authService.login(userData() as any)
			).rejects.toHaveProperty("status", 401)
			expect(userRepository.getByEmail).toBeCalledTimes(1)
		})
	})
})
