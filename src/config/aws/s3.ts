import { createReadStream } from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

const uploadPublicFile = async (file: Express.Multer.File) => {
  const fileContent = createReadStream(file.path);
  const fileName = file.filename;
  const mimeType = file.mimetype;
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: `public/${fileName}`,
    Body: fileContent,
    ContentType: mimeType,
  });

  return await s3Client.send(command);
};

export default { uploadPublicFile };
