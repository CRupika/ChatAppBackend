import DirectMessageService from "../services/directMessage.service.js";

class DirectMessageController {

    static async sendMessage(req, res) {

        try {

            const data = {
                conversationId: req.body.conversationId,
                senderId: req.userId,
                message: req.body.message
            };

            const message =
                await DirectMessageService.sendMessage(data);

            return res.status(201).json({
                success: true,
                message: "Message sent successfully.",
                data: message
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    static async getMessages(req, res) {

        try {

            const { conversationId } = req.params;

            const messages =
                await DirectMessageService.getMessages(
                    conversationId
                );

            return res.status(200).json({
                success: true,
                data: messages
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    static async editMessage(req, res) {

        try {

            const { id } = req.params;

            const { message } = req.body;

            const updatedMessage =
                await DirectMessageService.editMessage(
                    id,
                    message
                );

            return res.status(200).json({
                success: true,
                data: updatedMessage
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    static async deleteMessage(req, res) {

        try {

            const { id } = req.params;

            const deletedMessage =
                await DirectMessageService.deleteMessage(id);

            return res.status(200).json({
                success: true,
                data: deletedMessage
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}

export default DirectMessageController;