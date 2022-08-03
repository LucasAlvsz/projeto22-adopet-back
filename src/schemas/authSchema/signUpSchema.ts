import { SignUpData } from "@/types/userTypes"
import Joi from "joi"

const bodySchema = Joi.object<SignUpData>({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
})
	.required()
	.options({ allowUnknown: false })

const signUpchema = Joi.object({
	body: bodySchema,
}).options({ allowUnknown: true })

export default signUpchema
