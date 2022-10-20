import { SignUpData } from "@/types/userTypes"
import Joi from "joi"

const bodySchema = Joi.object<SignUpData>({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
	cep: Joi.string()
		.pattern(/^\d{5}-\d{3}$/)
		.required(),
	phone: Joi.string()
		.pattern(/^\(?([1-9]{2})\) ?([9]{1})?([0-9]{4})-?([0-9]{4})$/)
		.required(),
})
	.required()
	.options({ allowUnknown: false })

const signUpchema = Joi.object({
	body: bodySchema,
}).options({ allowUnknown: true })

export default signUpchema
