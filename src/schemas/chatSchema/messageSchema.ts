import { ChatRoomMessagePayload } from "@/types/chatTypes";
import Joi from "joi";

const messageSchema = Joi.object<ChatRoomMessagePayload>({
    chatRoomId: Joi.string().required(),
    text: Joi.string().required(),
});

export default messageSchema;