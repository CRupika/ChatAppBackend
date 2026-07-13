import express from "express";
import DirectMessageController from "../controllers/directMessage.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/messages",
    protect,
    DirectMessageController.sendMessage
);

router.get(
    "/conversations/:conversationId/messages",
    protect,
    DirectMessageController.getMessages
);

router.put(
    "/messages/:id",
    protect,
    DirectMessageController.editMessage
);

router.delete(
    "/messages/:id",
    protect,
    DirectMessageController.deleteMessage
);

export default router;