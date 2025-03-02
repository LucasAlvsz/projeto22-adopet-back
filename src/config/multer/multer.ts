import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";

import { Request } from "express";
import { randomUUID } from "crypto";
import multer, { FileFilterCallback, StorageEngine } from "multer";

import { InternalServerError, UnprocessableEntityError } from "@/errors";
import { MAX_PET_PICTURES, PET_PICTURE_MAX_SIZE } from "./magicNumbers";

type StorageType = "local";

export interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}

const ensureDirectoryExists = (dirPath: string) => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
};

const localStorage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      ensureDirectoryExists(
        resolve(__dirname, "..", "..", "..", "tmp", "uploads")
      )
    );
  },
  filename: (req, file, cb) => {
    cb(null, `${randomUUID()}-${file.originalname.replace(/\s/g, "")}`);
  },
});

const storageTypes: Record<StorageType, any> = {
  local: localStorage,
};

const storageType: StorageType =
  (process.env.STORAGE_TYPE as StorageType) || "local";
if (!storageTypes[storageType]) {
  throw new InternalServerError("Invalid storage type");
}

const imageOptions = {
  storage: storageTypes[storageType],
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedMimes.includes(file.mimetype)) {
      return cb(
        new UnprocessableEntityError(
          `Invalid file type. Only ${allowedMimes.join(", ")} are allowed`
        )
      );
    }
    cb(null, true);
  },

  limits: {
    fileSize: PET_PICTURE_MAX_SIZE,
    files: MAX_PET_PICTURES,
  },
};

export default { imageOptions };
