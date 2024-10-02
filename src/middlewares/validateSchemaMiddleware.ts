import { NextFunction, Request } from "express";
import { ObjectSchema } from "joi";

import { UnprocessableEntityError } from "@/errors";

const validateSchema = (schema: ObjectSchema) => {
  return (req: Request, _, next: NextFunction) => {
    const { error } = schema.validate(req, { abortEarly: false });
    if (error)
      throw new UnprocessableEntityError(
        error.details
          .map((detail) => detail.message.replace(/"/g, ""))
          .join(", ")
      );
    next();
  };
};

export default validateSchema;
