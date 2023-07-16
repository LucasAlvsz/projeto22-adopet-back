/*
  Warnings:

  - You are about to drop the column `addressId` on the `pets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_addressId_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "addressId";
