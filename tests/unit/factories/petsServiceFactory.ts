import { Faker } from "@faker-js/faker"

const petsData = (filter: any = false, userId: any = false, adressId: any = false) => {
	return {
		filter: filter,
		userId: userId || 1,
		adressId: adressId || 1,
	}
}

export { petsData }
