import e from "express";
import ChannelMemberController from "../controllers/channelMember.controller.js";

const router = e.Router();

router.post(
    "/channel-members",
    ChannelMemberController.addMember
)

router.get(
    "/channels/:id/members",
    ChannelMemberController.getMembers
)

router.delete(
    "/channel-members/:id",
    ChannelMemberController.removeMember
)

export default router