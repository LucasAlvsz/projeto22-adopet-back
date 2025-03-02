/*
  Warnings:

  - You are about to drop the column `type` on the `breeds` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `pets` table. All the data in the column will be lost.
  - Added the required column `petTypeId` to the `breeds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petTypeId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "breeds" DROP COLUMN "type",
ADD COLUMN     "petTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "type",
ADD COLUMN     "petTypeId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "pet_types";

-- CreateTable
CREATE TABLE "pet_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pet_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pet_types_name_key" ON "pet_types"("name");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_petTypeId_fkey" FOREIGN KEY ("petTypeId") REFERENCES "pet_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "breeds" ADD CONSTRAINT "breeds_petTypeId_fkey" FOREIGN KEY ("petTypeId") REFERENCES "pet_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
