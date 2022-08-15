import queryFactory from "../../src/factories/queryFactory"
import petsRepository from "../../src/respositories/petsRepository"
import petsService from "../../src/services/petsService"
import { petsData } from "./factories/petsServiceFactory"

beforeEach(() => {
	jest.clearAllMocks()
})

describe("Pets Service", () => {
	describe("Get All pets", () => {
		it("Should return all pets", async () => {
			jest.spyOn(petsRepository, "findAll").mockResolvedValueOnce([])

			const { filter, userId, adressId } = petsData()
			await expect(petsService.getPets(filter, userId, adressId)).resolves.toHaveProperty(
				"length",
				0
			)
			expect(petsRepository.findAll).toBeCalledTimes(1)
		})
	})
	describe("Get profile pet", () => {
		it("Should return profile pet", async () => {
			jest.spyOn(queryFactory, "getById").mockResolvedValueOnce(petsData())
			jest.spyOn(petsRepository, "getById").mockResolvedValueOnce({ id: 1 } as any)

			await expect(petsService.getProfileById(1)).resolves.toHaveProperty("id", 1)
			expect(queryFactory.getById).toBeCalledTimes(1)
			expect(queryFactory.getById).toBeCalledWith(1, "Pet")
			expect(petsRepository.getById).toBeCalledTimes(1)
		})
		it("Should throw not found error", async () => {
			jest.spyOn(queryFactory, "getById").mockResolvedValueOnce(null)

			await expect(petsService.getProfileById(1)).rejects.toHaveProperty("status", 404)
			expect(queryFactory.getById).toBeCalledTimes(1)
			expect(queryFactory.getById).toBeCalledWith(1, "Pet")
			expect(petsRepository.getById).toBeCalledTimes(0)
		})
	})
	describe("Add not interested pet", () => {
		it("Should add not interested pet", async () => {
			jest.spyOn(queryFactory, "getById").mockResolvedValueOnce(petsData())
			jest.spyOn(petsRepository, "getById").mockResolvedValueOnce({ id: 1 } as any)
			jest.spyOn(petsRepository, "getNotInterestedPetByUserId").mockResolvedValueOnce(null)

			await expect(petsService.getProfileById(1)).resolves.toHaveProperty("id", 1)
			expect(queryFactory.getById).toBeCalledTimes(1)
			expect(queryFactory.getById).toBeCalledWith(1, "Pet")
			expect(petsRepository.getById).toBeCalledTimes(1)
		})
		it("Should throw not found error", async () => {
			jest.spyOn(queryFactory, "getById").mockResolvedValueOnce(null)

			await expect(petsService.getProfileById(1)).rejects.toHaveProperty("status", 404)
			expect(queryFactory.getById).toBeCalledTimes(1)
			expect(queryFactory.getById).toBeCalledWith(1, "Pet")
			expect(petsRepository.getById).toBeCalledTimes(0)
		})

		// it("Should throw conflict error", async () => {
		// 	jest.spyOn(queryFactory, "getById").mockResolvedValueOnce(petsData())
		// 	jest.spyOn(petsRepository, "getNotInterestedPetByUserId").mockResolvedValueOnce({
		// 		id: 1,
		// 	} as any)

		// 	await expect(petsService.getProfileById(1)).rejects.toHaveProperty("status", 409)
		// 	expect(queryFactory.getById).toBeCalledTimes(1)
		// 	expect(queryFactory.getById).toBeCalledWith(1, "Pet")
		// 	expect(petsRepository.getNotInterestedPetByUserId).toBeCalledTimes(1)
		// 	expect(petsRepository.getById).toBeCalledTimes(0)
		// })
	})
})
