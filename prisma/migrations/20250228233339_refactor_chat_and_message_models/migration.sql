/*
  Warnings:

  - You are about to drop the column `name` on the `chat_rooms` table. All the data in the column will be lost.
  - You are about to drop the `chat_room_messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat_room_messages" DROP CONSTRAINT "chat_room_messages_chatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "chat_room_messages" DROP CONSTRAINT "chat_room_messages_fromUserId_fkey";

-- AlterTable
ALTER TABLE "chat_rooms" DROP COLUMN "name";

-- DropTable
DROP TABLE "chat_room_messages";

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromUserId" TEXT NOT NULL,
    "chatRoomId" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "chat_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
