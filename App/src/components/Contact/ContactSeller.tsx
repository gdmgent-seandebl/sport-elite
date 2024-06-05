import React, { useState } from "react";
import { useAuth } from "../../components/Context/AuthContainer";
import { sendMessage } from "../../core/modules/messages/messages.api";
import style from "./ContactSeller.module.css";

interface ContactSellerProps {
  sellerId: string;
  productId: string;
}

const ContactSeller: React.FC<ContactSellerProps> = ({
  sellerId,
  productId,
}) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  if (!user || user._id === sellerId) {
    return null;
  }

  const handleSendMessage = async () => {
    if (!content.trim()) {
      setError("Message content cannot be empty.");
      return;
    }
    try {
      await sendMessage(sellerId, productId, content);
      setContent("");
      setError("");
      alert("Message sent successfully.");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message.");
    }
  };

  return (
    <div className={style.contactSeller}>
      <h3>Contact Seller</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your message here..."
      />
      {error && <p className={style.error}>{error}</p>}
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default ContactSeller;
