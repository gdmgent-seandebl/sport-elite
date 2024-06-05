import { API } from "../../../core/network/api";
import { Conversation } from "./conversation.types";

const getConversations = () => {
  return API.get<Conversation[]>(`/conversations/`);
};

export { getConversations };
