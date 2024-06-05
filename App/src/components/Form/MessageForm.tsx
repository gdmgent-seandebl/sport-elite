import React, { useState } from "react";
import {
  getMessages,
  sendMessage,
  markMessageAsRead,
} from "../../core/modules/messages/messages.api";
import { useAuth } from "../Context/AuthContainer";
import style from "./MessageForm.module.css";

const MessageForm: React.FC<{ receiverId: string; productId: string }> = ({
  receiverId,
  productId,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await sendMessage(receiverId, productId, newMessage);
      console.log("Message sent:", response.data);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        className={style.input}
      />
      <button type="submit" className={style.button}>
        Send
      </button>
    </form>
  );
};

export default MessageForm;
