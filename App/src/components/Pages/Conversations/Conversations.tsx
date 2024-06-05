import React, { useEffect, useState } from "react";
import Header from "../../Design/Header/Header";
import { getConversations } from "../../../core/modules/conversations/conversation.api";
import { getMessages } from "../../../core/modules/messages/messages.api";
import { useAuth } from "../../../components/Context/AuthContainer";
import style from "./Conversations.module.css";
import MessageForm from "../../Form/MessageForm";
import { Message } from "../../../core/modules/messages/messages.types";
import { Conversation } from "../../../core/modules/conversations/conversation.types";

const Conversations: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await getConversations();
      setConversations(response.data);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };

  const handleConversationClick = async (conversationId: string) => {
    try {
      const response = await getMessages(conversationId);
      const selectedConv = conversations.find(
        (conv) => conv._id === conversationId
      );
      setSelectedConversation(selectedConv || null);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  return (
    <>
      <Header />
      <div className={style.wrapper}>
        <h2 className={style.title}>Conversations</h2>
        <div className={style.container}>
          <div className={style.list}>
            {conversations.length === 0 ? (
              <p>No conversations</p>
            ) : (
              conversations.map((conversation) => (
                <a
                  key={conversation._id}
                  href="#"
                  className={style.item}
                  onClick={() => handleConversationClick(conversation._id)}
                >
                  <div className={style.details}>
                    <h3 className={style.name}>
                      {conversation.members
                        .map((member) => member.name)
                        .join(", ")}
                    </h3>
                  </div>
                  <span className={style.lastMessageTime}>
                    {conversation.updatedAt.toString()}
                  </span>
                </a>
              ))
            )}
          </div>
          <div className={style.messages}>
            {messages.map((message) => (
              <div
                key={message._id}
                className={`${style.message} ${
                  message.senderId?._id === user?._id ? style.my : ""
                }`}
              >
                <span className={style.messageSender}>
                  {message.senderId?.name}
                </span>
                <p className={style.messageContent}>{message.content}</p>
                <span className={style.messageTimestamp}>
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
            {selectedConversation && (
              <MessageForm
                receiverId={
                  selectedConversation.members.find(
                    (member) => member._id !== user?._id
                  )?._id || ""
                }
                productId={messages.length > 0 ? messages[0].productId : ""}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversations;
