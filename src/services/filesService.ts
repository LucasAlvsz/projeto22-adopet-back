import { s3 } from "@/config/aws";
import { unlink } from "fs/promises";

const uploadPublicTempFilesToS3 = async (files: Express.Multer.File[]) => {
  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      const result = await s3.uploadPublicFile(file);
      await unlink(file.path);

      return result;
    })
  );

  return uploadedFiles;
};

export default { uploadPublicTempFilesToS3 };
