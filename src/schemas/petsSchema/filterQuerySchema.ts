import { Filter } from "@/types/petTypes"
import Joi from "joi"

const queryShema = Joi.object<Filter>({
	location: Joi.boolean(),
	type: Joi.string().valid("dog", "cat"),
	vaccinated: Joi.boolean(),
}).options({ allowUnknown: false })

const filterQuerySchema = Joi.object({
	query: queryShema,
}).options({ allowUnknown: true })

export default filterQuerySchema
