import Joi from "joi";
import { BreedPayloadData } from "@/types/petTypes";

const bodySchema = Joi.object<BreedPayloadData>({
  name: Joi.string().required(),
  type: Joi.string().required(),
});

export const breedQuerySchema = Joi.object({
  type: {
    id: Joi.number().optional(),
    name: Joi.string().optional(),
  },
}).options({ allowUnknown: true });

const breedSchema = Joi.object({
  body: bodySchema,
}).options({ allowUnknown: true });

export default breedSchema;
