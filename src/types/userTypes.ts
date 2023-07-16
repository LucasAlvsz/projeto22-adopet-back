import { User } from "@prisma/client"

type SignUpData = { cep: string } & Omit<User, "id" | "createdAt | addressId">

type UserData = Omit<SignUpData, "name">

export { SignUpData, UserData }
