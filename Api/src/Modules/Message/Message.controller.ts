import { Request, Response, NextFunction } from "express";
import MessageModel from "./Message.model";
import ConversationModel from "../Conversation/Conversation.model";
import { AuthRequest } from "../../Middleware/auth/authMiddleware";
import NotFoundError from "../../Middleware/error/NotFoudError";

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { receiverId, productId, content } = req.body;

    const message = new MessageModel({
      senderId: user.id,
      receiverId,
      productId,
      content,
    });

    await message.save();

    let conversation = await ConversationModel.findOne({
      members: { $all: [user.id, receiverId] },
    });

    if (!conversation) {
      conversation = new ConversationModel({
        members: [user.id, receiverId],
        messages: [message._id],
      });
    } else {
      conversation.messages.push(message.id);
    }

    await conversation.save();

    res.json(message);
  } catch (err) {
    next(err);
  }
};

const getMessagesByIds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ids } = req.body;

    const messages = await MessageModel.find({
      _id: { $in: ids },
    });

    res.json(messages);
  } catch (err) {
    next(err);
  }
};

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { conversationId } = req.params;

    const conversation = await ConversationModel.findById(
      conversationId
    ).populate({
      path: "messages",
      populate: { path: "senderId receiverId", select: "name email" },
    });

    if (!conversation || !conversation.members.includes(user.id)) {
      throw new NotFoundError("Conversation not found");
    }

    res.json(conversation.messages);
  } catch (err) {
    next(err);
  }
};

const markMessageAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { messageId } = req.params;

    const message = await MessageModel.findById(messageId);

    if (!message || message.receiverId.toString() !== user.id.toString()) {
      throw new NotFoundError("Message not found");
    }

    message.read = true;
    await message.save();

    res.json(message);
  } catch (err) {
    next(err);
  }
};

export { sendMessage, getMessagesByIds, getMessages, markMessageAsRead };
