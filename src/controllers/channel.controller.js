import ChannelService from "../services/channel.service.js";

class ChannelController {

    static async createChannel(req, res) {
        try {
            const channel = await ChannelService.createChannel(req.body);
            res.status(201).json({
                success: true,
                data: channel
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    static async getChannels(req, res) {
        try {

            const { workspaceId } = req.params;
            const channels = await ChannelService.getChannels(workspaceId);
            res.status(200).json({
                success: true,
                data: channels
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    static async updateChannel(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const channel = await ChannelService.updateChannel(id, name);
            res.status(200).json({
                success: true,
                data: channel
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    static async deleteChannel(req, res) {
        try {
            const { id } = req.params;
            const channel = await ChannelService.deleteChannel(id);
            res.status(200).json({
                success: true,
                data: channel
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
}

export default ChannelController;