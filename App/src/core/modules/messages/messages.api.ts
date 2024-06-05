import { API } from "../../../core/network/api";
import { Message } from "./messages.types";

const sendMessage = (
  receiverId: string,
  productId: string,
  content: string
) => {
  return API.post<Message>(`/messages`, { receiverId, productId, content });
};

const getMessages = (conversationId: string) => {
  return API.get<Message[]>(`/conversations/${conversationId}/messages`);
};

const markMessageAsRead = (messageId: string) => {
  return API.patch<Message>(`/messages/${messageId}`);
};

export { sendMessage, getMessages, markMessageAsRead };
