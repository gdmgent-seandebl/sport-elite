import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../Middleware/auth/authMiddleware";
import ConversationModel from "./Conversation.model";

const getConversations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;

    const conversations = await ConversationModel.find({
      members: user.id,
    }).populate("members", "name email");

    res.json(conversations);
  } catch (err) {
    next(err);
  }
};

export { getConversations };
