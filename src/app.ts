import "express-async-errors";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import router from "@/routes";
import { handleError } from "./middlewares";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(handleError);

export default server;
