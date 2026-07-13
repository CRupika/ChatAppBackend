import express from "express";
import ConversationController from "../controllers/conversation.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/conversations",
    protect,
    ConversationController.createConversation
);

router.get(
    "/conversations",
    protect,
    ConversationController.getConversations
);

router.get(
    "/conversations/:id",
    protect,
    ConversationController.getConversationById
);

export default router;