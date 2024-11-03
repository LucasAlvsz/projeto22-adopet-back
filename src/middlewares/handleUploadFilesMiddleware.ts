import multer, { MulterError } from "multer";
import { Request, Response, NextFunction } from "express";
import {
  imageUploadOptions,
  MAX_PET_PICTURES,
  PET_PICTURE_MAX_SIZE,
} from "@/config/multer";
import { InternalServerError, UnprocessableEntityError } from "@/errors";

const upload = multer(imageUploadOptions.imageOptions);

const uploadSingleFile = (fieldName: string = "image") => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          throw new UnprocessableEntityError(
            `File size is too large. Max size is ${PET_PICTURE_MAX_SIZE / 1024 / 1024
            }MB`
          );
        }
        throw new InternalServerError(err.message);
      }
      next();
    });
  };
};

const uploadMultipleFiles = (
  fieldName: string = "images",
  maxCount: number = MAX_PET_PICTURES
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.array(fieldName)(req, res, (err) => {
      if (err) {
        if (err instanceof MulterError) {
          if (err.code === "LIMIT_FILE_SIZE")
            return res.status(422).json({
              message: `File size is too large. Max size is ${PET_PICTURE_MAX_SIZE / 1024 / 1024
                }MB`,
            });

          if (err.code === "LIMIT_FILE_COUNT")
            return res
              .status(422)
              .json({ message: `Maximum number of files is ${maxCount}` });

          return res.status(500).json({ message: "Unmapped Multer error" });
        }

        if (err instanceof UnprocessableEntityError)
          return res.status(422).json({ message: err.message });
      }

      next();
    });
  };
};

export default { uploadSingleFile, uploadMultipleFiles };
