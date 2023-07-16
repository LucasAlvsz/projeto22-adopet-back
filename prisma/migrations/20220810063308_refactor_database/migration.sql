/*
  Warnings:

  - You are about to drop the column `petId` on the `address` table. All the data in the column will be lost.
  - Changed the type of `CEP` on the `address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `addressId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_petId_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "petId",
DROP COLUMN "CEP",
ADD COLUMN     "CEP" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "addressId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
