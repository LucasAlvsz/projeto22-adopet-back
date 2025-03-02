import { MessagePayload } from "@/types/chatTypes";
import Joi from "joi";

const messageSchema = Joi.object<MessagePayload>({
    chatRoomId: Joi.string().required(),
    text: Joi.string().required(),
});

export default messageSchema;