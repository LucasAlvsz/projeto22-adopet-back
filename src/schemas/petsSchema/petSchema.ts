import Joi from "joi";
import { PetPayloadData } from "@/types/petTypes";

const bodySchema = Joi.object<PetPayloadData>({
  name: Joi.string().required(),
  age: Joi.number().required(),
  sex: Joi.string().required(),
  weight: Joi.number().required(),
  vaccinated: Joi.boolean().required(),
  about: Joi.string().required(),
  breedId: Joi.number().required(),
  type: Joi.string().valid("dog", "cat").required(), // TODO: validate type
});

const petSchema = Joi.object({
  body: bodySchema,
}).options({ allowUnknown: true });

export default petSchema;
