import { chatService } from "@/services";
import { ChatRoomPayload } from "@/types/chatTypes";
import { Request, Response } from "express";

const createNewChatRoom = async (req: Request, res: Response) => {
  const { id: userId } = res.locals.userData;
  const chatRoomData = { ...req.body, initiatorId: userId };
  const chatRoom = await chatService.createNewChatRoom(chatRoomData);
  res.status(201).send(chatRoom);
};

const getAllUserChatRooms = async (req: Request, res: Response) => {
  const { id: userId } = res.locals.userData;
  const chatRooms = await chatService.getAllUserChatRooms(userId);
  res.send(chatRooms);
};

const getAllChatRoomMessagesByChatRoomId = async (
  req: Request,
  res: Response
) => {
  const { id: userId } = res.locals.userData;
  const { chatRoomId } = req.params;
  const chatRoom = await chatService.getAllChatRoomMessagesByChatRoomId(
    chatRoomId,
    userId
  );
  res.send(chatRoom);
};

export default {
  createNewChatRoom,
  getAllUserChatRooms,
  getAllChatRoomMessagesByChatRoomId,
};
