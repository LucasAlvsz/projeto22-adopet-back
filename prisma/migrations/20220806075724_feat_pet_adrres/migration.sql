/*
  Warnings:

  - Added the required column `adressId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adress" ADD COLUMN     "petId" INTEGER;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "adressId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Adress" ADD CONSTRAINT "Adress_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
