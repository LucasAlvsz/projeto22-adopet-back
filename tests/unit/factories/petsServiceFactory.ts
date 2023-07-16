import { Faker } from "@faker-js/faker"

const petsData = (
	filter: any = false,
	userId: any = false,
	addressId: any = false
) => {
	return {
		filter: filter,
		userId: userId || 1,
		addressId: addressId || 1,
	}
}

export { petsData }
