import Joi from "joi"

import { SignUpData } from "@/types/userTypes"

const bodySchema = Joi.object<SignUpData>({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
	cep: Joi.string()
		.pattern(/^\d{5}-\d{3}$/)
		.required(),
	phone: Joi.string()
		.pattern(/^\(?(\d{2})\) ?([9]{1})?(\d{4})-?(\d{4})$/)
		.required(),
})
	.required()
	.options({ allowUnknown: false })

const signUpSchema = Joi.object({
	body: bodySchema,
}).options({ allowUnknown: true })

export default signUpSchema
