/*
  Warnings:

  - The values [dogs,cats] on the enum `PetType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PetType_new" AS ENUM ('dog', 'cat');
ALTER TABLE "pets" ALTER COLUMN "type" TYPE "PetType_new" USING ("type"::text::"PetType_new");
ALTER TABLE "breeds" ALTER COLUMN "type" TYPE "PetType_new" USING ("type"::text::"PetType_new");
ALTER TYPE "PetType" RENAME TO "PetType_old";
ALTER TYPE "PetType_new" RENAME TO "PetType";
DROP TYPE "PetType_old";
COMMIT;
