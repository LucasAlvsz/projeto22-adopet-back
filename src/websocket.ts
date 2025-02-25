import { io } from "./app";
import { UnauthorizedError } from "./errors";
import { authSchema } from "./schemas";
import { JWTUtils } from "./utils";

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
    JWTUtils.validateToken(token as string);
    next();
  } catch (err) {
    next(err);
  }
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("Desconectado");
  });
});

io.on("message", (data) => {
  console.log("message", data);
  // io.to(data.chatRoomId).emit("newMessage", data);
});

// io.on("newMessage", (data:
//     console.log(data);
//     io.to(data.chatRoomId).emit("newMessage", data);
// });
