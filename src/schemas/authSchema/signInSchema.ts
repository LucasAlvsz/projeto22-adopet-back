import { UserData } from "@/types/userTypes"
import Joi from "joi"

const bodySchema = Joi.object<UserData>({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
})
	.required()
	.options({ allowUnknown: false })

const signInSchema = Joi.object({
	body: bodySchema,
}).options({ allowUnknown: true })

export default signInSchema
