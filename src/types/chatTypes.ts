import { ChatRoom, Message } from "@prisma/client";

type ChatRoomPayload = Omit<ChatRoom, "id" | "createdAt" | "initiatorId">;

type ChatRoomData = Omit<ChatRoom, "id" | "createdAt">;

type MessagePayload = Omit<Message, "id" | "createdAt">;

export { ChatRoomPayload, ChatRoomData, MessagePayload };
