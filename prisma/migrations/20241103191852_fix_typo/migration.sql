/*
  Warnings:

  - You are about to drop the column `initiatiorId` on the `chat_rooms` table. All the data in the column will be lost.
  - Added the required column `initiatorId` to the `chat_rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chat_rooms" DROP CONSTRAINT "chat_rooms_initiatiorId_fkey";

-- AlterTable
ALTER TABLE "chat_rooms" DROP COLUMN "initiatiorId",
ADD COLUMN     "initiatorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "chat_rooms" ADD CONSTRAINT "chat_rooms_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
