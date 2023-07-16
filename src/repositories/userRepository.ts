import prisma from "@/db"
import { SignUpData } from "@/types/userTypes"

const create = async (user: SignUpData) => prisma.user.create({ data: user })

const getByEmail = async (email: string) => {
	return prisma.user.findUnique({ where: { email } })
}

export default { create, getByEmail }
