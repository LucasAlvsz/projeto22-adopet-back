import { io } from "./app";
import { UnauthorizedError } from "./errors";
import { authSchema } from "./schemas";
import { MessagePayload } from "@/types/chatTypes";
import { JWTUtils } from "./utils";
import { chatService } from "./services";
import { queryFactory } from "./factories";

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  const { error } = authSchema.tokenSchema.validate(token, {
    abortEarly: false,
  });

  if (error) {
    next(new UnauthorizedError("Invalid token: " + error.message));
    return;
  }
  try {
    const { id: userId } = JWTUtils.validateToken(token as string);
    socket.data.userId = userId;
    next();
  } catch (err) {
    next(err);
  }
});

type SocketEvents = {
  joinRoom: string;
  newMessage: {
    message: string;
  };
};

const messagesDataBuffer: {
  [socketId: string]: {
    chatRoomId: string;
    messages: string[];
  };
} = {};

io.on("connection", async (socket) => {
  socket.on("joinRoom", async (chatRoomId: string) => {
    const userId = socket.data.userId;

    const chatRoom = await queryFactory.getById(chatRoomId, "ChatRoom");
    if (
      !chatRoom ||
      ![chatRoom.ownerId, chatRoom.initiatorId].includes(userId)
    ) {
      socket.emit("error", "Você não tem permissão para entrar nesta sala.");
      socket.disconnect();
      return;
    }

    socket.join(chatRoomId);
    messagesDataBuffer[socket.id] = {
      chatRoomId,
      messages: [],
    };
    console.log(messagesDataBuffer[socket.id]);
    socket.emit("joinedRoom", chatRoomId);
  });

  socket.on(
    "newMessage" as keyof SocketEvents,
    (data: SocketEvents["newMessage"]) => {
      socket.broadcast.emit("newMessage", data.message);
      messagesDataBuffer[socket.id].messages.push(data.message);
    }
  );

  socket.on("disconnect", async () => {
    const { chatRoomId, messages } = messagesDataBuffer[socket.id];
    if (chatRoomId) {
      await chatService.createMessages(
        messages.map((message) => ({
          chatRoomId,
          text: message,
          fromUserId: socket.data.userId,
        }))
      );
    }
  });
});
