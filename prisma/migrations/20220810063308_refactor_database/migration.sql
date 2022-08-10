/*
  Warnings:

  - You are about to drop the column `petId` on the `Adress` table. All the data in the column will be lost.
  - Changed the type of `CEP` on the `Adress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `adressId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Adress" DROP CONSTRAINT "Adress_petId_fkey";

-- AlterTable
ALTER TABLE "Adress" DROP COLUMN "petId",
DROP COLUMN "CEP",
ADD COLUMN     "CEP" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "adressId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
