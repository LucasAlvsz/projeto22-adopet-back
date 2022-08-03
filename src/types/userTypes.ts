import { User } from "@prisma/client"

type SignUpData = Omit<User, "id" | "createdAt">

type UserData = Omit<SignUpData, "name">

export { SignUpData, UserData }
