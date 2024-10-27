import { Filter } from "@/types/petTypes"
import Joi from "joi"

const querySchema = Joi.object<Filter>({
	location: Joi.boolean(),
	vaccinated: Joi.boolean(),
	type: Joi.string().valid("dog", "cat"),
}).options({ allowUnknown: false })

const filterQuerySchema = Joi.object({
	query: querySchema,
}).options({ allowUnknown: true })

export default filterQuerySchema
