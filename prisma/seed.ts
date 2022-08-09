import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import { faker } from "@faker-js/faker"
import { encryptWithSalt } from "../src/utils/cryptographyUtils"

const main = async () => {
	const users = [
		{
			name: "Lucax",
			email: "lucax@gmail.com",
			password: encryptWithSalt("lucaxlucax"),
		},
	]

	const states = [
		{
			name: "DF",
		},
	]

	const city = [
		{
			name: "Brasília",
		},
	]

	const districts = [
		{
			name: "Santa Maria",
		},
	]

	const adresses = [
		{
			stateId: 1,
			cityId: 1,
			districtId: 1,
			CEP: "72547378",
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
			sex: "Male",
			weight: Number(faker.random.numeric()),
			vaccinated: true,
			about: faker.lorem.lines(),
			breedId: 1,
			ownerId: 1,
			adressId: 1,
		},
		{
			name: faker.animal.cat.name,
			type: "cat" as const,
			age: Number(faker.random.numeric()),
			sex: "Female",
			weight: Number(faker.random.numeric()),
			vaccinated: true,
			about: faker.lorem.lines(),
			breedId: 2,
			ownerId: 1,
			adressId: 1,
		},
	]
	const notInterestedPets = [
		{
			userId: 1,
			petId: 2,
		},
	]

	const pictures = [
		{
			url: faker.image.imageUrl(640, 640, "dog"),
		},
		{
			url: faker.image.imageUrl(640, 640, "cat"),
		},
	]

	const petPics = [
		{
			petId: 1,
			pictureId: 1,
		},
		{
			petId: 2,
			pictureId: 2,
		},
	]

	await prisma.user.createMany({ data: users })
	await prisma.breed.createMany({ data: breeds })
	await prisma.pet.createMany({ data: pets })
	await prisma.picture.createMany({ data: pictures })
	await prisma.petPictures.createMany({ data: petPics })
	await prisma.notInterestedPet.createMany({ data: notInterestedPets })
}
main()
	.catch(e => {
		console.error(e)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
