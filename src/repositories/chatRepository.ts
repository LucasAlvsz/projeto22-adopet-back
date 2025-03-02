import prisma from "@/config/database";
import { MessagePayload, ChatRoomData } from "@/types/chatTypes";

const createNewChatRoom = async (chatRoomData: ChatRoomData) => {
  return await prisma.chatRoom.create({ data: { ...chatRoomData } });
};
const getChatRoomByUsersId = async (ownerId: string, initiatorId: string) => {
  return await prisma.chatRoom.findFirst({
    where: {
      ownerId,
      initiatorId,
    },
  });
};

const getChatRoomById = async (chatRoomId: string) => {
  return await prisma.chatRoom.findFirst({
    where: {
      id: chatRoomId,
    },
  });
};

const getAllUserChatRooms = async (userId: string) => {
  return await prisma.chatRoom.findMany({
    where: {
      OR: [
        {
          ownerId: userId,
        },
        {
          initiatorId: userId,
        },
      ],
    },
  });
};

const createNewMessages = async (messageData: MessagePayload[]) => {
  return await prisma.message.createMany({
    data: messageData.map((messageData) => ({
      ...messageData,
    })),
  });
};

const getAllChatRoomMessagesByChatRoomId = async (chatRoomId: string) => {
  return await prisma.message.findMany({
    take: 50,
    where: {
      chatRoomId,
    },
    select: {
      text: true,
      fromUserId: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export default {
  createNewChatRoom,
  getChatRoomByUsersId,
  getChatRoomById,
  getAllUserChatRooms,
  createNewMessages,
  getAllChatRoomMessagesByChatRoomId,
};
