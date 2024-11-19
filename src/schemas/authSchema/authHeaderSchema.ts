import joi from "joi"

export const tokenSchema = joi.string().pattern(/^[\w-]*\.[\w-]*\.[\w-]*$/).required()

const authHeaderSchema = joi
	.object({
		authorization: joi
			.string()
			.pattern(/^Bearer\s[\w-]*\.[\w-]*\.[\w-]*$/)
			.required(),
	})
	.options({ allowUnknown: true })

export default authHeaderSchema
