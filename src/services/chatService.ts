import { ConflictError } from "@/errors";
import { chatRepository } from "@/repositories";
import { ChatRoomData, MessagePayload } from "@/types/chatTypes";

const createNewChatRoom = async (chatRoomData: ChatRoomData) => {
  await validateIfChatRoomAlreadyExists(chatRoomData);
  return await chatRepository.createNewChatRoom(chatRoomData);
};

const validateIfChatRoomAlreadyExists = async (chatRoomData: ChatRoomData) => {
  const { ownerId, initiatorId } = chatRoomData;
  if (ownerId === initiatorId) {
    throw new ConflictError("You are trying to create chat room with yourself");
  }
  const chatRoom = await chatRepository.getChatRoomByUsersId(
    ownerId,
    initiatorId
  );
  if (chatRoom) {
    throw new ConflictError("Chat room already exists");
  }
};

const getAllUserChatRooms = async (userId: string) => {
  return await chatRepository.getAllUserChatRooms(userId);
};

const getAllChatRoomMessagesByChatRoomId = async (
  chatRoomId: string,
  userId: string
) => {
  const chatRoom = await chatRepository.getChatRoomById(chatRoomId);
  if (
    !chatRoom ||
    (userId !== chatRoom.ownerId && userId !== chatRoom.initiatorId)
  ) {
    throw new ConflictError("Chat room not found");
  }

  const messages = await chatRepository.getAllChatRoomMessagesByChatRoomId(
    chatRoomId
  );

  return messages.map(({ text, fromUserId, createdAt }) => ({
    text,
    sent: fromUserId === userId,
    createdAt,
  }));
};

const createMessages = async (messageData: MessagePayload[]) => {
  return await chatRepository.createNewMessages(messageData);
};

export default {
  createNewChatRoom,
  getAllUserChatRooms,
  getAllChatRoomMessagesByChatRoomId,
  createMessages,
};
