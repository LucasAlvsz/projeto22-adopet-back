type Address = {
	cep: string
	state: string
	city: string
	district: string
	street: string
}

type CEPResponse = {
	cep: string
	state: string
	city: string
	neighborhood: string
	street: string
	service: string
}

export { Address, CEPResponse }
