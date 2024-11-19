/*
  Warnings:

  - Added the required column `fromUserId` to the `chat_room_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `chat_room_messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat_room_messages" ADD COLUMN     "fromUserId" TEXT NOT NULL,
ADD COLUMN     "toUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "chat_room_messages" ADD CONSTRAINT "chat_room_messages_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_room_messages" ADD CONSTRAINT "chat_room_messages_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
