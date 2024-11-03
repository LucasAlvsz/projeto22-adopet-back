/*
  Warnings:

  - Changed the type of `sex` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "pet_sex" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "sex",
ADD COLUMN     "sex" "pet_sex" NOT NULL;
