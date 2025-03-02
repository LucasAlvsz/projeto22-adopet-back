/*
  Warnings:

  - You are about to drop the column `toUserId` on the `chat_room_messages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat_room_messages" DROP CONSTRAINT "chat_room_messages_toUserId_fkey";

-- AlterTable
ALTER TABLE "chat_room_messages" DROP COLUMN "toUserId";
