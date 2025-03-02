import { Router } from "express";
import { validateBearerToken, validateSchema } from "@/middlewares";
import { chatController } from "@/controllers";
import { chatRoomSchema } from "@/schemas/chatSchema";

const chatRouter = Router();

chatRouter
  .use(validateBearerToken)
  .post(
    "/chat-room",
    validateSchema(chatRoomSchema),
    chatController.createNewChatRoom
  )
  .get("/chat-rooms", chatController.getAllUserChatRooms)
  .get(
    "/chat-room/:chatRoomId",
    chatController.getAllChatRoomMessagesByChatRoomId
  );

export default chatRouter;
