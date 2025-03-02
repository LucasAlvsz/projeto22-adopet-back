import Joi from "joi";
import { PetTypePayloadData } from "@/types/petTypes";

const bodySchema = Joi.object<PetTypePayloadData>({
  name: Joi.string().required(),
});

const petTypeSchema = Joi.object({
  body: bodySchema,
}).options({ allowUnknown: true });

export default petTypeSchema;
