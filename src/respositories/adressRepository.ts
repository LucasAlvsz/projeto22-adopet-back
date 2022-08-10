import prisma from "@/db"

import { Adress } from "@/types/adressType"

const create = async (data: Adress) => {
	const { id: stateId } = await prisma.state.create({ data: { name: data.state } })
	const { id: cityId } = await prisma.city.create({ data: { name: data.city, stateId } })
	const { id: districtId } = await prisma.district.create({
		data: { name: data.district, cityId },
	})
	return prisma.adress.create({ data: { CEP: data.cep, stateId, cityId, districtId } })
}

const getById = async (adressId: number) => {
	return prisma.adress.findUnique({
		where: { id: adressId },
		select: {
			city: { select: { name: true } },
			state: { select: { name: true } },
			district: { select: { name: true } },
		},
	})
}

export default { create, getById }
