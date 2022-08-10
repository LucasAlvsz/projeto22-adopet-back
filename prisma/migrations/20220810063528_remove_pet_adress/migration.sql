/*
  Warnings:

  - You are about to drop the column `adressId` on the `pets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_adressId_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "adressId";
