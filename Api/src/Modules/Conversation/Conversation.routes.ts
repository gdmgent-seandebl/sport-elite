import { Router } from "express";
import { getConversations } from "./Conversation.controller";

const router = Router();
router.get("/conversations", getConversations);

export default router;
