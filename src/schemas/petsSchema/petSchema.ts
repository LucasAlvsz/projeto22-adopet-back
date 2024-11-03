import Joi from "joi";
import { PetPayloadData } from "@/types/petTypes";

const bodySchema = Joi.object<PetPayloadData>({
  name: Joi.string().required(),
  age: Joi.number().required(),
  sex: Joi.string().valid("Male", "Female").required(),
  weight: Joi.number().required(),
  vaccinated: Joi.boolean().required(),
  about: Joi.string().required(),
  breedId: Joi.number().required(),
  petTypeId: Joi.number().required(),
});

const petSchema = Joi.object({
  body: bodySchema,
}).options({ allowUnknown: true });

export default petSchema;
