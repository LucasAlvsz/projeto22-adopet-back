import { faker } from "@faker-js/faker"

const userData = (
	email = false,
	password: any = false,
	name = false,
	cep = false,
	phone = false
) => {
	return {
		email: email || faker.internet.email(),
		password: password || faker.internet.password(8),
		name: name || faker.name.firstName(),
		cep: cep || "72547379",
		phone: phone || "(99) 99999-9999",
	}
}

export { userData }
