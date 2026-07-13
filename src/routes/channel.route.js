import express from "express";
import ChannelController from "../controllers/channel.controller.js";

const router = express.Router();

router.post(
    "/channels",
    ChannelController.createChannel
);

router.get(
    "/workspaces/:workspaceId/channels",
    ChannelController.getChannels
);

router.put(
    "/channels/:id",
    ChannelController.updateChannel
);

router.delete(
    "/channels/:id",
    ChannelController.deleteChannel
);

export default router;