/*
  Warnings:

  - Added the required column `CEP` to the `Adress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adress" ADD COLUMN     "CEP" TEXT NOT NULL;
