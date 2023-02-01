import Joi from "joi"

import { UserData } from "@/types/userTypes"

const bodySchema = Joi.object<UserData>({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
})
	.required()
	.options({ allowUnknown: false })

const signInSchema = Joi.object({
	body: bodySchema,
}).options({ allowUnknown: true })

export default signInSchema
