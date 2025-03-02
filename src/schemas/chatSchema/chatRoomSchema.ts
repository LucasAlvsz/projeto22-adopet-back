import { ChatRoomPayload } from "@/types/chatTypes";
import Joi from "joi";

const chatRoomBodySchema = Joi.object<ChatRoomPayload>({
  ownerId: Joi.string().required(),
}).options({ allowUnknown: false });

const chatRoomSchema = Joi.object({
  body: chatRoomBodySchema,
}).options({ allowUnknown: true });

export default chatRoomSchema;
