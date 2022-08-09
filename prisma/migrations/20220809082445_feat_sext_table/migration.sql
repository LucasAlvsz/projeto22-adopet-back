/*
  Warnings:

  - Added the required column `sex` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "sex" TEXT NOT NULL;
