import { NextFunction, Request } from "express";
import { ObjectSchema } from "joi";

import { UnprocessableEntityError } from "@/errors";
import { filesService } from "@/services";
import { MulterRequest } from "@/config/multer/multer";

const validateSchema = (schema: ObjectSchema) => {
  return (req: Request | MulterRequest, _, next: NextFunction) => {
    const { error } = schema.validate(req, { abortEarly: false });
    if (error) {
      if (req.file || req.files)
        filesService.deleteTempFiles(
          (req.files as Express.Multer.File[]) || [
            req.file as Express.Multer.File,
          ]
        );
      throw new UnprocessableEntityError(
        error.details
          .map((detail) => detail.message.replace(/"/g, ""))
          .join(", ")
      );
    }
    next();
  };
};

export default validateSchema;
