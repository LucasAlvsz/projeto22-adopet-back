/*
  Warnings:

  - The values [dog,cat] on the enum `PetType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `size` on the `pets` table. All the data in the column will be lost.
  - Added the required column `weight` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PetType_new" AS ENUM ('dogs', 'cats');
ALTER TABLE "pets" ALTER COLUMN "type" TYPE "PetType_new" USING ("type"::text::"PetType_new");
ALTER TABLE "breeds" ALTER COLUMN "type" TYPE "PetType_new" USING ("type"::text::"PetType_new");
ALTER TYPE "PetType" RENAME TO "PetType_old";
ALTER TYPE "PetType_new" RENAME TO "PetType";
DROP TYPE "PetType_old";
COMMIT;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "size",
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- DropEnum
DROP TYPE "Size";
