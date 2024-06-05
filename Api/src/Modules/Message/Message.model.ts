import mongoose from "mongoose";
import validateModel from "../../Validation/validateModel";
import { Message } from "./Message.types";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

const messageModel = mongoose.model<Message>("Message", messageSchema);

export default messageModel;
