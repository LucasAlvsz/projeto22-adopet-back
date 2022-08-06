/*
  Warnings:

  - You are about to drop the `user_pets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_pets" DROP CONSTRAINT "user_pets_petId_fkey";

-- DropForeignKey
ALTER TABLE "user_pets" DROP CONSTRAINT "user_pets_userId_fkey";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "user_pets";

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
