import prisma from "@/config/database";
// import { ChatRoom } from "@prisma/client";
import { ChatRoomMessagePayload, ChatRoomPayload } from "@/types/chatTypes";

const createNewChatRoom = async (chatRoomData: ChatRoomPayload) => {
    return await prisma.chatRoom.create({ data: { ...chatRoomData } });
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

const createNewMessages = async (messageData: ChatRoomMessagePayload[], userId: string) => {
    return await prisma.chatRoomMessage.createMany({
        data: messageData.map((message) => ({
            ...message,
            fromUserId: userId,
        })),
    });
};

const getAllChatRoomMessagesByChatRoomId = async (chatRoomId: string) => {
    return await prisma.chatRoomMessage.findMany({
        where: {
            chatRoomId,
        },
    });
};


export default { createNewChatRoom, getAllUserChatRooms, createNewMessages, getAllChatRoomMessagesByChatRoomId };