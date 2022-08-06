import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import { faker } from "@faker-js/faker"
import { encryptWithSalt } from "../src/utils/cryptographyUtils"

const main = async () => {
	const users = [
		{
			name: "Lucax",
			email: "lucax@gmail.com",
			password: encryptWithSalt("12345789"),
		},
	]
	const breeds = [
		{
			name: "Pug",
			type: "dog" as const,
		},
		{
			name: "Mestiço",
			type: "cat" as const,
		},
	]
	const pets = [
		{
			name: faker.animal.dog.name,
			type: "dog" as const,
			age: Number(faker.random.numeric()),
			weight: Number(faker.random.numeric()),
			vaccinated: true,
			about: faker.lorem.lines(),
			breedId: 1,
			ownerId: 1,
		},
		{
			name: faker.animal.cat.name,
			type: "cat" as const,
			age: Number(faker.random.numeric()),
			weight: Number(faker.random.numeric()),
			vaccinated: true,
			about: faker.lorem.lines(),
			breedId: 2,
			ownerId: 1,
		},
	]
	const notInterestedPets = [
		{
			userId: 1,
			petId: 2,
		},
	]

	await prisma.user.createMany({ data: users })
	await prisma.breed.createMany({ data: breeds })
	await prisma.pet.createMany({ data: pets })
	await prisma.notInterestedPet.createMany({ data: notInterestedPets })
}
main()
	.catch(e => {
		console.error(e)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
