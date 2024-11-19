import { ChatRoom, ChatRoomMessage } from "@prisma/client";

type ChatRoomPayload = Omit<ChatRoom, "id" | "createdAt">;

type ChatRoomMessagePayload = Omit<ChatRoomMessage, "id" | "createdAt">;

export {
    ChatRoomPayload,
    ChatRoomMessagePayload,
}