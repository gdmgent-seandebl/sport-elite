import mongoose from "mongoose";
import validateModel from "../../Validation/validateModel";
import { Conversation } from "./Conversation.types";

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

conversationSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

const conversationModel = mongoose.model<Conversation>(
  "Conversation",
  conversationSchema
);

export default conversationModel;
