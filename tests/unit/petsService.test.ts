import petsRepository from "../../src/respositories/petsRepository"
import petsService from "../../src/services/petsService"
import { petsData } from "./factories/petsServiceFactory"

beforeEach(() => {
	jest.clearAllMocks()
})

describe("Pets Service", () => {
	describe("Get pets", () => {
		it("Should return all pets", async () => {
			jest.spyOn(petsRepository, "findAll").mockResolvedValueOnce([] as any)

			const { filter, userId, adressId } = petsData()
			await expect(petsService.getPets(filter, userId, adressId)).resolves.toHaveProperty(
				"length",
				0
			)
			expect(petsRepository.findAll).toBeCalledTimes(1)
		})
	})
})
