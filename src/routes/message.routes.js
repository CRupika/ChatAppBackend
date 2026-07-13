import express from 'express';
import MessageController from '../controllers/message.controller.js'

const router = express.Router();

// const MessageController = require("../controllers/message.controller");

// Send message
router.post("/messages", MessageController.sendMessage);

// Get all messages of a channel
router.get("/channels/:id/messages", MessageController.getMessages);

// Edit message
router.put("/messages/:id", MessageController.editMessage);

// Delete message
router.delete("/messages/:id", MessageController.deleteMessage);

export default router;