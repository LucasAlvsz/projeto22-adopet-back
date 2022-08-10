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
			adressId: 1,
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
			stateId: 1,
		},
	]

	const districts = [
		{
			name: "Santa Maria",
			cityId: 1,
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
			ownerId: 1
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
			url: "https://static.natgeo.pt/files/styles/image_3200/public/75552.ngsversion.1422285553360.webp?w=768",
		},
		{
			url: "https://www.organnact.com.br/wp-content/uploads/2021/09/doencas-mais-comuns-em-gatos-no-inverno.jpg",
		},
		{
			url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWUnHC4LDnWLtbEjINI7oL2u29y50y7vb8jnPdgrEBqbxVHLImCJEj3ks_bxHCQgMipHw&usqp=CAU",
		},
		{
			url: "https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg",
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
		{
			petId: 2,
			pictureId: 3,
		},
		{
			petId: 2,
			pictureId: 4,
		},
		{
			petId: 2,
			pictureId: 5,
		},
	]
	await prisma.state.createMany({ data: states })
	await prisma.city.createMany({ data: city })
	await prisma.district.createMany({ data: districts })
	await prisma.adress.createMany({ data: adresses })
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
